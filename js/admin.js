(() => {
  const STORAGE_KEY = 'tenzin-academy-content-draft-v1';
  const GROUPS = {stem:'Science & Technology',lang:'Languages',hum:'Humanities & Commerce'};
  let data = null;
  let editing = null;
  let recordType = 'faculty';
  const $ = id => document.getElementById(id);
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const clone = value => JSON.parse(JSON.stringify(value));
  const setStatus = message => { $('save-state').textContent = message; };
  async function start() {
    try {
      const response = await fetch('content.json', {cache:'no-store'});
      if (!response.ok) throw new Error('Could not load content.json');
      data = await response.json();
      const draft = localStorage.getItem(STORAGE_KEY);
      if (draft) { data = JSON.parse(draft); setStatus('Restored local draft'); }
      else setStatus('Content loaded');
      renderAll();
    } catch (error) {
      setStatus('Unable to load content.json');
      document.querySelector('.main').insertAdjacentHTML('beforeend', '<p class="notice">Start this site through a local web server, not by opening the HTML file directly. For example: <code>python3 -m http.server 8000</code>.</p>');
      console.error(error);
    }
  }
  function saveDraft() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setStatus('Draft saved in this browser');
  }
  function renderAll() { renderFaculty(); renderGallery(); fillSchool(); }
  function renderFaculty() {
    const query = $('faculty-search').value.trim().toLowerCase();
    let total = 0;
    $('faculty-groups').innerHTML = Object.entries(GROUPS).map(([key,label]) => {
      const people = (data.faculty[key] || []).map((person,index)=>({...person,index,group:key})).filter(p => [p.name,p.role,p.creds].join(' ').toLowerCase().includes(query));
      total += people.length;
      return '<section><h3 class="group-title">'+escapeHtml(label)+'</h3><div class="card-list">'+(people.length ? people.map(p=>'<article class="faculty-card"><div class="avatar">'+(p.photo?'<img src="'+escapeHtml(p.photo)+'" alt="">':escapeHtml((p.name||'?').slice(0,1)))+'</div><div class="faculty-info"><strong>'+escapeHtml(p.name)+'</strong><small>'+escapeHtml(p.role)+' · '+escapeHtml(p.creds)+'</small></div><div class="card-actions"><button class="text-button" data-edit-faculty="'+p.group+':'+p.index+'">Edit</button><button class="text-button danger" data-delete-faculty="'+p.group+':'+p.index+'">Delete</button></div></article>').join(''):'<div class="empty">No matching faculty members.</div>')+'</div></section>';
    }).join('');
    $('faculty-count').textContent = total+' members';
  }
  function renderGallery() {
    $('gallery-list').innerHTML = data.gallery.map((item,index)=>'<article class="gallery-card"><img src="'+escapeHtml(item.src)+'" alt="'+escapeHtml(item.cap)+'" onerror="this.style.opacity=.2"><div class="gallery-body"><strong>'+escapeHtml(item.cap)+'</strong><small>'+escapeHtml(item.cat)+' · '+escapeHtml(item.src)+'</small><div class="card-actions"><button class="text-button" data-edit-gallery="'+index+'">Edit</button><button class="text-button danger" data-delete-gallery="'+index+'">Delete</button></div></div></article>').join('') || '<div class="empty">No gallery items yet.</div>';
  }
  function fillSchool() { const form=$('school-form'); Object.entries(data.school||{}).forEach(([key,value])=>{if(form.elements[key])form.elements[key].value=value;}); }
  function openRecord(type, record=null, location=null) {
    recordType=type; editing=location;
    $('dialog-title').textContent=(record?'Edit ':'Add ')+(type==='faculty'?'faculty member':'gallery item');
    $('faculty-fields').classList.toggle('hidden',type!=='faculty');
    $('gallery-fields').classList.toggle('hidden',type!=='gallery');
    const form=$('record-form'); form.reset();
    const fields=type==='faculty'?$('faculty-fields'):$('gallery-fields');
    Object.entries(record||{}).forEach(([key,value])=>{if(form.elements[key])form.elements[key].value=value;});
    if(type==='faculty' && location) form.elements.group.value=location[0];
    $('record-dialog').showModal();
  }
  function closeDialog(){ $('record-dialog').close(); }
  $('record-form').addEventListener('submit',event=>{
    event.preventDefault();
    const form=event.currentTarget;
    if(recordType==='faculty'){
      const group=form.elements.group.value;
      const person={name:form.elements.name.value.trim(),photo:form.elements.photo.value.trim(),role:form.elements.role.value.trim(),creds:form.elements.creds.value.trim()};
      if(editing){const [oldGroup,oldIndex]=editing; if(oldGroup===group)data.faculty[group][Number(oldIndex)]=person; else {data.faculty[oldGroup].splice(Number(oldIndex),1);data.faculty[group].push(person);}}
      else data.faculty[group].push(person);
    } else {
      const item={cap:form.elements.cap.value.trim(),src:form.elements.src.value.trim(),cat:form.elements.cat.value};
      if(editing===null)data.gallery.push(item);else data.gallery[Number(editing)]=item;
    }
    saveDraft();renderAll();closeDialog();
  });
  document.addEventListener('click',event=>{
    const target=event.target;
    if(target.closest('[data-edit-faculty]')){const [group,index]=target.closest('[data-edit-faculty]').dataset.editFaculty.split(':');openRecord('faculty',data.faculty[group][Number(index)],[group,index]);}
    if(target.closest('[data-delete-faculty]')){const [group,index]=target.closest('[data-delete-faculty]').dataset.deleteFaculty.split(':');if(confirm('Remove this faculty member?')){data.faculty[group].splice(Number(index),1);saveDraft();renderAll();}}
    if(target.closest('[data-edit-gallery]')){const index=Number(target.closest('[data-edit-gallery]').dataset.editGallery);openRecord('gallery',data.gallery[index],index);}
    if(target.closest('[data-delete-gallery]')){const index=Number(target.closest('[data-delete-gallery]').dataset.deleteGallery);if(confirm('Remove this gallery item?')){data.gallery.splice(index,1);saveDraft();renderAll();}}
  });
  document.querySelectorAll('.nav-item').forEach(button=>button.addEventListener('click',()=>{
    document.querySelectorAll('.nav-item').forEach(item=>item.classList.toggle('active',item===button));
    document.querySelectorAll('.view').forEach(view=>view.classList.add('hidden'));
    $(button.dataset.view+'-view').classList.remove('hidden');
    $('page-title').textContent=button.textContent.trim();
  }));
  $('add-faculty').addEventListener('click',()=>openRecord('faculty'));
  $('add-gallery').addEventListener('click',()=>openRecord('gallery'));
  $('faculty-search').addEventListener('input',renderFaculty);
  $('school-form').addEventListener('submit',event=>{event.preventDefault();data.school=Object.fromEntries(new FormData(event.currentTarget).entries());saveDraft();});
  $('export-btn').addEventListener('click',()=>{
    const blob=new Blob([JSON.stringify(data,null,2)+'\n'],{type:'application/json'});
    const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download='content.json';link.click();URL.revokeObjectURL(url);
    setStatus('Downloaded content.json · upload it to publish');
  });
  $('dialog-close').addEventListener('click',closeDialog);
  $('cancel-record').addEventListener('click',closeDialog);
  start();
})();