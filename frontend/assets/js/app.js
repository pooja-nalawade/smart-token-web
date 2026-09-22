const specialties = [
  {name:'Gynaecology', icon:'♀', desc:'Women’s health & reproductive care', mins:15},
  {name:'Physiotherapy', icon:'◌', desc:'Movement, rehabilitation & pain care', mins:20},
  {name:'Psychology', icon:'◉', desc:'Mental wellbeing & counselling', mins:30},
  {name:'General Medicine', icon:'✚', desc:'General health & common conditions', mins:12},
  {name:'Paediatrics', icon:'♧', desc:'Healthcare for children', mins:15},
  {name:'Orthopaedics', icon:'⌁', desc:'Bones, joints & mobility', mins:18},
  {name:'Dermatology', icon:'✦', desc:'Skin, hair & nail care', mins:12},
  {name:'ENT', icon:'◒', desc:'Ear, nose & throat care', mins:12}
];

const hospitals = [
  {id:1,name:'Shivaji Government Hospital',locality:'Dadar',city:'Mumbai',state:'Maharashtra',pin:'400014',address:'Dr Babasaheb Ambedkar Road, Dadar East, Mumbai',lat:19.0178,lon:72.8478,specialties:['Gynaecology','Physiotherapy','Psychology','General Medicine','Paediatrics','Orthopaedics','Dermatology','ENT'],wait:34,queue:7},
  {id:2,name:'Lokmanya Tilak Municipal Hospital',locality:'Sion',city:'Mumbai',state:'Maharashtra',pin:'400022',address:'Sion, Mumbai',lat:19.0433,lon:72.8610,specialties:['Gynaecology','Physiotherapy','General Medicine','Paediatrics','Orthopaedics','ENT'],wait:48,queue:10},
  {id:3,name:'Rajawadi Government Hospital',locality:'Ghatkopar',city:'Mumbai',state:'Maharashtra',pin:'400077',address:'Rajawadi, Ghatkopar East, Mumbai',lat:19.0896,lon:72.9081,specialties:['Gynaecology','Psychology','General Medicine','Paediatrics','Dermatology'],wait:28,queue:5},
  {id:4,name:'Kalyan District Hospital',locality:'Kalyan West',city:'Kalyan',state:'Maharashtra',pin:'421301',address:'Kalyan West, Thane District, Maharashtra',lat:19.2437,lon:73.1355,specialties:['Gynaecology','Physiotherapy','General Medicine','Orthopaedics','ENT'],wait:41,queue:8},
  {id:5,name:'Civil Hospital Thane',locality:'Thane West',city:'Thane',state:'Maharashtra',pin:'400601',address:'Civil Hospital Road, Thane West, Maharashtra',lat:19.1970,lon:72.9708,specialties:['Gynaecology','Psychology','General Medicine','Paediatrics','Dermatology','ENT'],wait:36,queue:6},

  // Additional Mumbai public/government hospitals
  {id:6,name:'K.E.M. Hospital',locality:'Parel',city:'Mumbai',state:'Maharashtra',pin:'400012',address:'Acharya Donde Marg, Parel, Mumbai',lat:18.9992,lon:72.8408,specialties:['Gynaecology','Physiotherapy','Psychology','General Medicine','Paediatrics','Orthopaedics','Dermatology','ENT'],wait:52,queue:12},
  {id:7,name:'B.Y.L. Nair Hospital',locality:'Mumbai Central',city:'Mumbai',state:'Maharashtra',pin:'400008',address:'Dr Anandrao Nair Marg, Mumbai Central, Mumbai',lat:18.9767,lon:72.8236,specialties:['Gynaecology','Physiotherapy','Psychology','General Medicine','Paediatrics','Orthopaedics','Dermatology','ENT'],wait:46,queue:11},
  {id:8,name:'Dr. R.N. Cooper Municipal General Hospital',locality:'Juhu',city:'Mumbai',state:'Maharashtra',pin:'400056',address:'JVPD Scheme, Juhu, Mumbai',lat:19.1075,lon:72.8360,specialties:['Gynaecology','Physiotherapy','Psychology','General Medicine','Paediatrics','Orthopaedics','Dermatology','ENT'],wait:39,queue:8},
  {id:9,name:'K.B. Bhabha Municipal General Hospital',locality:'Bandra',city:'Mumbai',state:'Maharashtra',pin:'400050',address:'Waterfield Road, Bandra West, Mumbai',lat:19.0615,lon:72.8332,specialties:['Gynaecology','Physiotherapy','Psychology','General Medicine','Paediatrics','Orthopaedics','Dermatology','ENT'],wait:37,queue:7},
  {id:10,name:'V.N. Desai Municipal General Hospital',locality:'Santacruz East',city:'Mumbai',state:'Maharashtra',pin:'400055',address:'Road No. 11, Golibar, Santacruz East, Mumbai',lat:19.0795,lon:72.8505,specialties:['Gynaecology','Physiotherapy','Psychology','General Medicine','Paediatrics','Orthopaedics','Dermatology','ENT'],wait:42,queue:9},
  {id:11,name:'Sant Muktabai Municipal General Hospital',locality:'Ghatkopar West',city:'Mumbai',state:'Maharashtra',pin:'400084',address:'S.G. Barve Marg, Ghatkopar West, Mumbai',lat:19.0864,lon:72.9046,specialties:['Gynaecology','Psychology','General Medicine','Paediatrics','Dermatology'],wait:31,queue:6},
  {id:12,name:'K.M.J. Phule Municipal General Hospital',locality:'Vikhroli East',city:'Mumbai',state:'Maharashtra',pin:'400083',address:'Vikhroli East, Mumbai',lat:19.1114,lon:72.9270,specialties:['Gynaecology','Physiotherapy','General Medicine','Paediatrics','Orthopaedics','ENT'],wait:35,queue:7},
  {id:13,name:'Siddharth Municipal General Hospital',locality:'Goregaon West',city:'Mumbai',state:'Maharashtra',pin:'400104',address:'Goregaon West, Mumbai',lat:19.1663,lon:72.8499,specialties:['Gynaecology','Psychology','General Medicine','Paediatrics','Dermatology','ENT'],wait:38,queue:8},
  {id:14,name:'Shatabdi Hospital',locality:'Kandivali',city:'Mumbai',state:'Maharashtra',pin:'400067',address:'Kandivali, Mumbai',lat:19.2047,lon:72.8377,specialties:['Gynaecology','Physiotherapy','General Medicine','Paediatrics','Orthopaedics','ENT'],wait:40,queue:9},
  {id:15,name:'Shatabdi Hospital',locality:'Govandi',city:'Mumbai',state:'Maharashtra',pin:'400043',address:'Govandi East, Mumbai',lat:19.0554,lon:72.9189,specialties:['Gynaecology','Psychology','General Medicine','Paediatrics','Dermatology'],wait:33,queue:7},
  {id:16,name:'S.K. Patil Municipal General Hospital',locality:'Malad',city:'Mumbai',state:'Maharashtra',pin:'400064',address:'Malad, Mumbai',lat:19.1872,lon:72.8487,specialties:['Gynaecology','Physiotherapy','General Medicine','Paediatrics','Orthopaedics','ENT'],wait:36,queue:8},
  {id:17,name:'H.B.T. Trauma Care Hospital',locality:'Jogeshwari',city:'Mumbai',state:'Maharashtra',pin:'400102',address:'Jogeshwari, Mumbai',lat:19.1378,lon:72.8334,specialties:['General Medicine','Orthopaedics','ENT'],wait:44,queue:10},
  {id:18,name:'K.B. Bhabha Municipal General Hospital',locality:'Kurla',city:'Mumbai',state:'Maharashtra',pin:'400070',address:'Kurla West, Mumbai',lat:19.0726,lon:72.8826,specialties:['Gynaecology','Physiotherapy','General Medicine','Paediatrics','Orthopaedics','ENT'],wait:43,queue:9},
  {id:19,name:'M.W. Desai Municipal General Hospital',locality:'Malad',city:'Mumbai',state:'Maharashtra',pin:'400064',address:'Malad, Mumbai',lat:19.1870,lon:72.8480,specialties:['Gynaecology','General Medicine','Paediatrics','Dermatology'],wait:34,queue:7}
];

let patient = {};
let selectedSpecialty = null;
let selectedHospital = null;
let patientCoordinates = null;

function openModal(id){document.getElementById(id).classList.add('show')}
function closeModal(id){document.getElementById(id).classList.remove('show')}
function toast(msg,type='success'){
  const t=document.getElementById('toast'); if(!t)return;
  t.textContent=msg; t.className='toast show '+type;
  setTimeout(()=>t.classList.remove('show'),3200);
}
function submitPatient(e){
  e.preventDefault();
  patient={name:pName.value,location:pLocation.value,phone:pPhone.value,email:pEmail.value};
  goPatientStep(2); renderSpecialties();
}
function goPatientStep(n){
  document.querySelectorAll('#patientModal .modal-step').forEach(x=>x.classList.remove('active'));
  const ids=['patientStep1','patientStep2','patientStep3','patientStep4'];
  document.getElementById(ids[n-1]).classList.add('active');
  document.querySelectorAll('.modal-progress span').forEach((x,i)=>x.classList.toggle('active',i<n));
}
function renderSpecialties(){
  specialtyGrid.innerHTML=specialties.map((s,i)=>`
    <button class="specialty-card" onclick="selectSpecialty(${i})">
      <span>${s.icon}</span><b>${s.name}</b><small>${s.desc}</small><i>→</i>
    </button>`).join('');
}
function selectSpecialty(i){
  selectedSpecialty=specialties[i];
  hospitalSearch.value='';
  goPatientStep(3); renderHospitals();
}
function distanceKm(lat1, lon1, lat2, lon2){
  const R=6371, toRad=v=>v*Math.PI/180;
  const dLat=toRad(lat2-lat1), dLon=toRad(lon2-lon1);
  const a=Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)**2;
  return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
}

function renderHospitals(){
  const q=(hospitalSearch.value||'').toLowerCase().trim();
  let list=hospitals.filter(h=>
    h.specialties.includes(selectedSpecialty.name) &&
    [h.name,h.locality,h.city,h.state,h.pin,h.address].join(' ').toLowerCase().includes(q)
  );

  if(patientCoordinates){
    list=list.map(h=>({...h,distance:distanceKm(patientCoordinates.lat,patientCoordinates.lon,h.lat,h.lon)}))
             .sort((a,b)=>a.distance-b.distance);
  }

  hospitalList.innerHTML=list.length?list.map((h,index)=>`
    <button class="hospital-card" onclick="selectHospital(${h.id})">
      <div class="hospital-icon">✚</div><div class="hospital-info"><b>${h.name}</b><span>${h.address}</span>
      <small>${h.locality}, ${h.city} · ${h.pin}${typeof h.distance==='number' ? ` · ${h.distance.toFixed(1)} km away` : ''}</small>
      <div class="hospital-meta"><em>● ${h.queue} waiting</em><em>~${h.wait} min avg wait</em></div></div><strong>→</strong>
    </button>`).join(''):`<div class="empty-state">No ${selectedSpecialty.name} hospitals found for this search. Try a wider locality, city or PIN.</div>`;
}
function selectHospital(id){
  selectedHospital=hospitals.find(h=>h.id===id);
  bookingSummary.innerHTML=`<div><span>Specialty</span><b>${selectedSpecialty.name}</b></div>
  <div><span>Hospital</span><b>${selectedHospital.name}</b></div>
  <div><span>Patient</span><b>${patient.name}</b></div>
  <div><span>Location</span><b>${selectedHospital.locality}, ${selectedHospital.city} · ${selectedHospital.pin}</b></div>`;
  const d=new Date(); d.setDate(d.getDate()+1); apptDate.value=d.toISOString().slice(0,10);
  goPatientStep(4);
}
function confirmBooking(e){
  e.preventDefault();
  const token=40+Math.floor(Math.random()*20);
  const wait=selectedHospital.wait+Math.floor(Math.random()*9)-3;
  const arrival=new Date(`${apptDate.value}T${apptTime.value}`);
  arrival.setMinutes(arrival.getMinutes()-15);
  tokenResult.innerHTML=`<div class="result-token">#${token}</div>
  <div class="result-details"><div><span>Hospital</span><b>${selectedHospital.name}</b></div>
  <div><span>Department</span><b>${selectedSpecialty.name}</b></div>
  <div><span>Estimated wait</span><b>~${Math.max(10,wait)} minutes</b></div>
  <div><span>Suggested arrival</span><b>${arrival.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</b></div>
  <div><span>Appointment</span><b>${new Date(`${apptDate.value}T${apptTime.value}`).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</b></div></div>
  <div class="notification-sim"><b>✉ Email + SMS scheduled</b><small>Token, wait time, arrival time and future live queue changes will be sent to ${patient.phone} / ${patient.email}.</small></div>`;
  document.querySelectorAll('#patientModal .modal-step').forEach(x=>x.classList.remove('active'));
  patientSuccess.classList.add('active');
  document.querySelectorAll('.modal-progress span').forEach(x=>x.classList.add('active'));
}
function useCurrentLocation(){
  locationStatus.textContent='Requesting your location to sort nearby hospitals...';
  if(!navigator.geolocation){
    locationStatus.textContent='Location is not supported. You can continue using locality, city or PIN search.';
    return;
  }
  navigator.geolocation.getCurrentPosition(
    pos=>{
      patientCoordinates={lat:pos.coords.latitude,lon:pos.coords.longitude};
      locationStatus.textContent='Location received. Hospitals are now shown from nearest to farthest.';
      renderHospitals();
    },
    ()=>{
      locationStatus.textContent='Location was not shared. You can continue using locality, city or PIN search.';
    },
    {enableHighAccuracy:true,timeout:10000,maximumAge:300000}
  );
}
function adminLogin(e){
  e.preventDefault();
  const code=hospitalCode.value.trim();
  if(code!=='SMT-MUM-001'){toast('Demo hospital code is SMT-MUM-001','error');return}
  window.location.href='admin.html';
}
