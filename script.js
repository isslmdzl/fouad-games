const defaultGames=[
  {"id": 1, "name": "GTA V", "image": "images/game_1.svg", "price": 500, "visible": true, "video": "https://www.youtube.com/watch?v=QkkoHAzjinY"},
  {"id": 2, "name": "Red Dead Redemption 2", "image": "images/game_2.svg", "price": 500, "visible": true, "video": "https://www.youtube.com/watch?v=eaW0tYXiHgE"},
  {"id": 3, "name": "God of War", "image": "images/game_3.svg", "price": 500, "visible": true, "video": "https://www.youtube.com/watch?v=K0u_kAWLJOA"},
  {"id": 4, "name": "Marvel's Spider-Man", "image": "images/game_4.svg", "price": 500, "visible": true, "video": ""},
  {"id": 5, "name": "The Last of Us Part II", "image": "images/game_5.svg", "price": 500, "visible": true, "video": ""},
  {"id": 6, "name": "Ghost of Tsushima", "image": "images/game_6.svg", "price": 500, "visible": true, "video": ""},
  {"id": 7, "name": "Horizon Zero Dawn", "image": "images/game_7.svg", "price": 500, "visible": true, "video": ""},
  {"id": 8, "name": "Uncharted 4", "image": "images/game_8.svg", "price": 500, "visible": true, "video": ""},
  {"id": 9, "name": "Spider-Man: Miles Morales", "image": "images/game_9.svg", "price": 500, "visible": true, "video": ""},
  {"id": 10, "name": "Days Gone", "image": "images/game_10.svg", "price": 500, "visible": true, "video": ""},
  {"id": 11, "name": "Detroit: Become Human", "image": "images/game_11.svg", "price": 500, "visible": true, "video": ""},
  {"id": 12, "name": "Bloodborne", "image": "images/game_12.svg", "price": 500, "visible": true, "video": ""},
  {"id": 13, "name": "The Witcher 3", "image": "images/game_13.svg", "price": 500, "visible": true, "video": ""},
  {"id": 14, "name": "Assassin's Creed Odyssey", "image": "images/game_14.svg", "price": 500, "visible": true, "video": ""},
  {"id": 15, "name": "Assassin's Creed Origins", "image": "images/game_15.svg", "price": 500, "visible": true, "video": ""},
  {"id": 16, "name": "Far Cry 5", "image": "images/game_16.svg", "price": 500, "visible": true, "video": ""},
  {"id": 17, "name": "Resident Evil 2", "image": "images/game_17.svg", "price": 500, "visible": true, "video": ""},
  {"id": 18, "name": "Resident Evil 3", "image": "images/game_18.svg", "price": 500, "visible": true, "video": ""},
  {"id": 19, "name": "Resident Evil 4", "image": "images/game_19.svg", "price": 500, "visible": true, "video": ""},
  {"id": 20, "name": "Mortal Kombat 11", "image": "images/game_20.svg", "price": 500, "visible": true, "video": ""},
  {"id": 21, "name": "Tekken 7", "image": "images/game_21.svg", "price": 500, "visible": true, "video": ""},
  {"id": 22, "name": "Call of Duty: Modern Warfare", "image": "images/game_22.svg", "price": 500, "visible": true, "video": ""},
  {"id": 23, "name": "Call of Duty: Black Ops III", "image": "images/game_23.svg", "price": 500, "visible": true, "video": ""},
  {"id": 24, "name": "Battlefield 1", "image": "images/game_24.svg", "price": 500, "visible": true, "video": ""},
  {"id": 25, "name": "Need for Speed Heat", "image": "images/game_25.svg", "price": 500, "visible": true, "video": ""},
  {"id": 26, "name": "Gran Turismo Sport", "image": "images/game_26.svg", "price": 500, "visible": true, "video": ""},
  {"id": 27, "name": "FIFA 23", "image": "images/game_27.svg", "price": 500, "visible": true, "video": ""},
  {"id": 28, "name": "EA Sports FC 24", "image": "images/game_28.svg", "price": 500, "visible": true, "video": ""},
  {"id": 29, "name": "Minecraft", "image": "images/game_29.svg", "price": 500, "visible": true, "video": ""},
  {"id": 30, "name": "Crash Bandicoot N. Sane Trilogy", "image": "images/game_30.svg", "price": 500, "visible": true, "video": ""}
];

let games = JSON.parse(localStorage.getItem("fouadGames") || "null") || defaultGames;
let cart = JSON.parse(localStorage.getItem("fouadCart") || "[]");
const $ = id => document.getElementById(id);
const defaultSlides = ["images/hero_collage.png","images/slide_1.svg","images/slide_2.svg","images/slide_3.svg","images/slide_4.svg","images/slide_5.svg"];

// دالة الحفظ الذكية لتفادي استهلاك الذاكرة
function save(){ 
  try {
    localStorage.setItem("fouadGames", JSON.stringify(games)); 
    localStorage.setItem("fouadCart", JSON.stringify(cart)); 
    return true;
  } catch(e) {
    console.warn("LocalStorage full, trying auto-cleanup...", e);
    // تفريغ صور الهيرو الكبيرة تلقائياً لتوفير مساحة كبيرة
    localStorage.removeItem("fouadHeroSlides");
    
    try {
      localStorage.setItem("fouadGames", JSON.stringify(games)); 
      localStorage.setItem("fouadCart", JSON.stringify(cart)); 
      showToast("⚠️ تم تحسين الذاكرة وتنفيذ الحفظ بنجاح");
      return true;
    } catch(err) {
      alert("⚠️ الذاكرة التخزينية للمتصفح ممتلئة جداً. يرجى حذف بعض الألعاب أو تفريغ بيانات التصفح.");
      return false;
    }
  }
}

function price(){ 
  return Math.floor(cart.length/3)*1000 + (cart.length%3)*500; 
}

function renderGames(){
  const grid = $("gamesGrid");
  if (!grid) return;
  const q = $("search") ? $("search").value.toLowerCase().trim() : "";
  const list = games.filter(g => g.visible !== false && g.name.toLowerCase().includes(q));
  grid.innerHTML = list.map(g => `
    <article class="card">
      <div class="cover">
        <img src="${g.image}" alt="${g.name}" loading="lazy" onerror="this.style.display='none';this.parentElement.textContent='🎮'">
      </div>
      <div class="body">
        <h3>${g.name}</h3>
        <div class="platform">PlayStation 4</div>
        <div class="price">${g.price||500} دج</div>
        <div style="display:flex; gap:5px; margin-top:8px;">
          <button class="add" style="flex:1;" onclick="addToCart(${g.id},this)">+ أضف للسلة</button>
          <button class="video-btn" onclick="openVideoModal('${encodeURIComponent(g.video || '')}')" style="background:#e50914; color:#fff; border:none; padding:6px 10px; border-radius:6px; cursor:pointer; font-weight:bold;">🎬 فيديو</button>
        </div>
      </div>
    </article>
  `).join("") || "<p>ما لقيناش اللعبة.</p>";
}

function openVideoModal(encodedUrl) {
  const videoUrl = decodeURIComponent(encodedUrl);
  if (!videoUrl || videoUrl === 'undefined' || videoUrl.trim() === '') {
    showToast("⚠️ لا يوجد فيديو متاح لهذه اللعبة حالياً");
    return;
  }
  
  let embedUrl = videoUrl;
  if (videoUrl.includes("watch?v=")) {
    embedUrl = videoUrl.replace("watch?v=", "embed/").split("&")[0];
  } else if (videoUrl.includes("youtu.be/")) {
    embedUrl = videoUrl.replace("youtu.be/", "www.youtube.com/embed/").split("?")[0];
  } else if (videoUrl.includes("youtube.com/shorts/")) {
    embedUrl = videoUrl.replace("youtube.com/shorts/", "www.youtube.com/embed/").split("?")[0];
  }

  closeVideoModal();

  const modalHTML = `
    <div id="videoModal" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); display:flex; align-items:center; justify-content:center; z-index:99999;">
      <div style="position:relative; width:90%; max-width:720px; background:#111; padding:10px; border-radius:12px; box-shadow:0 0 20px rgba(0,0,0,0.5);">
        <button onclick="closeVideoModal()" style="position:absolute; top:-12px; right:-12px; background:#e50914; color:#fff; border:none; border-radius:50%; width:32px; height:32px; cursor:pointer; font-weight:bold; font-size:16px; z-index:100000;">✕</button>
        <div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; border-radius:8px;">
          <iframe src="${embedUrl}?autoplay=1" style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;" allowfullscreen allow="autoplay"></iframe>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  if (modal) modal.remove();
}

function addToCart(id,btn){ 
  const g=games.find(x=>x.id===id); 
  if(!g)return; 
  cart.push(g); 
  save(); 
  updateCartCount(); 
  btn.classList.remove("pop"); 
  void btn.offsetWidth; 
  btn.classList.add("pop"); 
  showToast(`✅ ${g.name} تمت إضافتها للسلة`); 
}

function updateCartCount(){ 
  if($("cartCount")) $("cartCount").textContent=cart.length; 
}

function priceFmt(n){ 
  return n.toLocaleString("fr-DZ")+" دج"; 
}

function renderCart(){ 
  if($("count")) $("count").textContent=cart.length; 
  if($("total")) $("total").textContent=priceFmt(price()); 
  if($("items")) $("items").innerHTML=cart.length?cart.map((g,i)=>`<div class="row"><span>${g.name}</span><button class="remove" onclick="removeItem(${i})">حذف</button></div>`).join(""):"<p>السلة فارغة.</p>"; 
  if($("checkout")) $("checkout").classList.toggle("hidden",!cart.length); 
}

function removeItem(i){ 
  cart.splice(i,1); 
  save(); 
  renderCart(); 
  updateCartCount(); 
}

function openCart(){ 
  if($("cartModal")) $("cartModal").classList.remove("hidden"); 
  if($("customerBox")) $("customerBox").classList.add("hidden"); 
  if($("success")) $("success").classList.add("hidden"); 
  renderCart(); 
}

if($("cartBtn")) $("cartBtn").onclick=openCart;
if($("cartClose")) $("cartClose").onclick=()=>$("cartModal").classList.add("hidden");
if($("search")) $("search").oninput=renderGames;
if($("checkout")) $("checkout").onclick=()=>$("customerBox").classList.remove("hidden");

if($("orderForm")) {
  $("orderForm").onsubmit=async e=>{
    e.preventDefault();
    if(!cart.length)return;
    let code="FG-"+String(Date.now()).slice(-6);
    const order={name:$("name").value,phone:$("phone").value,games:cart.map(g=>g.name),total:price(),createdAt:new Date().toISOString(),status:"جديد"};
    let online=false;
    try{
      const r=await fetch("/api/orders",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(order)});
      if(r.ok){ const x=await r.json(); code=x.code; online=true; }
    }catch(e){}
    if(!online){
      const orders=JSON.parse(localStorage.getItem("fouadOrders")||"[]");
      orders.push({...order,code});
      localStorage.setItem("fouadOrders",JSON.stringify(orders));
    }
    $("success").classList.remove("hidden");
    $("success").innerHTML=`✅ تم تسجيل الطلب<br>رقم الطلب: <strong>${code}</strong><br>احتفظ بالرمز، وتقدر تشوفه لاحقاً من «طلباتي».`;
    cart=[]; save(); renderCart(); updateCartCount(); e.target.reset(); $("customerBox").classList.add("hidden");
  };
}

if($("myOrdersBtn")) {
  $("myOrdersBtn").onclick=()=>{
    const orders=JSON.parse(localStorage.getItem("fouadOrders")||"[]");
    $("orders").innerHTML=orders.length?orders.slice().reverse().map(o=>`<div class="order-card"><b>${o.code}</b><br><span class="status">${o.status}</span><br>${o.games.join(" • ")}<br><strong>${priceFmt(o.total)}</strong></div>`).join(""):"<p>ما عندك حتى طلب محفوظ في هذا المتصفح.</p>";
    $("ordersModal").classList.remove("hidden");
  };
}
if($("ordersClose")) $("ordersClose").onclick=()=>$("ordersModal").classList.add("hidden");

function renderAdmin(){
  if(!$("adminList")) return;
  $("adminList").innerHTML=games.map((g,i)=>`<div class="admin-item">
    <span><img class="admin-thumb" src="${g.image}" onerror="this.style.display='none'">${g.name} — ${g.price||500} دج</span>
    <span>
      <button class="editgame" onclick="editGame(${i})">✏️ تعديل</button>
      <button class="hidegame" onclick="toggleGame(${i})">${g.visible===false?"إظهار":"إخفاء"}</button>
      <button class="hidegame" onclick="deleteGame(${i})">حذف</button>
    </span></div>`).join("");
}

function editGame(i){
  const g=games[i]; if(!g)return;
  $("editId").value=String(i);
  $("editName").value=g.name;
  $("editPrice").value=g.price||500;
  if($("editVideo")) $("editVideo").value = g.video || "";
  $("editImage").value="";
  $("editGameModal").classList.remove("hidden");
}

function toggleGame(i){ 
  games[i].visible=games[i].visible===false; 
  save(); 
  renderGames(); 
  renderAdmin(); 
}

function deleteGame(i){ 
  if(confirm("تحب تحذف هذه اللعبة؟")){ 
    games.splice(i,1); 
    save(); 
    renderGames(); 
    renderAdmin(); 
  } 
}

if($("adminBtn")) $("adminBtn").onclick=()=>{$("admin").classList.remove("hidden"); renderAdmin();};
if($("adminClose")) $("adminClose").onclick=()=>$("admin").classList.add("hidden");

// دالة ضغط الصور العالية الكفاءة لتفادي امتلاء localstorage
function compressImage(file, callback) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = event => {
    const img = new Image();
    img.src = event.target.result;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const MAX_WIDTH = 200; // أبعاد صغيرة جداً ومناسبة للغلاف
      const scaleFactor = MAX_WIDTH / img.width;
      canvas.width = MAX_WIDTH;
      canvas.height = img.height * scaleFactor;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      callback(canvas.toDataURL('image/jpeg', 0.4)); // جودة 40% لضغط خفيف جداً
    };
  };
}

// إضافة لعبة جديدة
if($("addGame")) {
  $("addGame").addEventListener("submit", function(e) {
    e.preventDefault();
    const nameInput = $("gName");
    const priceInput = $("gPrice");
    const videoInput = $("gVideo");
    const imageInput = $("gImage");

    if(!nameInput.value.trim()) { alert("يرجى إدخال اسم اللعبة"); return; }
    if(!imageInput.files || !imageInput.files[0]) { alert("يرجى اختيار صورة الغلاف"); return; }

    compressImage(imageInput.files[0], function(base64Image) {
      const newGame = {
        id: Date.now(),
        name: nameInput.value.trim(),
        image: base64Image,
        price: Number(priceInput.value) || 500,
        visible: true,
        video: videoInput ? videoInput.value.trim() : ""
      };

      games.push(newGame);
      if(save()) {
        renderGames();
        renderAdmin();
        e.target.reset();
        alert("✅ تمت إضافة اللعبة بنجاح!");
      }
    });
  });
}

function showToast(text){ 
  const t=$("toast"); 
  if(!t)return; 
  t.textContent=text; 
  t.classList.add("show"); 
  clearTimeout(window.toastTimer); 
  window.toastTimer=setTimeout(()=>t.classList.remove("show"),1700); 
}

function renderHero(){
  if(!$("heroSlides")) return;
  const saved=JSON.parse(localStorage.getItem("fouadHeroSlides")||"null");
  const slides=(saved&&saved.length?saved:defaultSlides);
  $("heroSlides").innerHTML=slides.map((s,i)=>`<div class="hero-slide ${i===0?"active":""}" style="background-image:url('${s}')"></div>`).join("");
  let i=0;
  setInterval(()=>{
    const el=document.querySelectorAll(".hero-slide");
    if(!el.length)return;
    el[i].classList.remove("active");
    i=(i+1)%el.length;
    el[i].classList.add("active");
  },4500);
}

if($("heroFiles")) {
  $("heroFiles").addEventListener("change",e=>{
    const fs=[...e.target.files].slice(0,6);
    if(!fs.length)return;
    const out=[]; let done=0;
    fs.forEach(f=>{
      compressImage(f, function(res){
        out.push(res); done++;
        if(done===fs.length){ localStorage.setItem("fouadHeroSlides",JSON.stringify(out)); renderHero(); showToast("🖼️ تم تحديث خلفية الموقع"); }
      });
    });
  });
}

if($("clearHero")) $("clearHero").onclick=()=>{ localStorage.removeItem("fouadHeroSlides"); location.reload(); };

if($("editClose")) $("editClose").onclick=()=>$("editGameModal").classList.add("hidden");

if($("editGameForm")) {
  $("editGameForm").onsubmit=e=>{
    e.preventDefault();
    const i=Number($("editId").value), g=games[i];
    if(!g)return;
    g.name=$("editName").value.trim();
    g.price=Number($("editPrice").value)||500;
    if($("editVideo")) g.video=$("editVideo").value.trim();
    const f=$("editImage").files ? $("editImage").files[0] : null;
    if(f){
      compressImage(f, function(res){
        g.image=res; 
        save(); 
        renderGames(); 
        renderAdmin(); 
        $("editGameModal").classList.add("hidden"); 
        showToast("✅ تم تعديل اللعبة والغلاف والفيديو"); 
      });
    }else{
      save(); 
      renderGames(); 
      renderAdmin(); 
      $("editGameModal").classList.add("hidden"); 
      showToast("✅ تم تعديل اللعبة والفيديو بنجاح");
    }
  };
}

async function loadAdminOrders(){
  const p=$("adminPassword").value; if(!p){showToast("🔐 اكتب كلمة السر");return}
  try{
    const r=await fetch("/api/admin/orders",{headers:{"x-admin-password":p}});
    if(!r.ok)throw 0;
    const a=await r.json();
    $("adminOrders").innerHTML=a.length?a.map(o=>`<div class="admin-order"><b>${o.code}</b> — ${o.name} — ${o.phone}<br>${o.games.join(" • ")}<br><strong>${o.total.toLocaleString("fr-DZ")} دج</strong><br><select onchange="changeStatus('${o.code}',this.value)"><option ${o.status==="جديد"?"selected":""}>جديد</option><option ${o.status==="قيد التحضير"?"selected":""}>قيد التحضير</option><option ${o.status==="جاهز للاستلام"?"selected":""}>جاهز للاستلام</option><option ${o.status==="مكتمل"?"selected":""}>مكتمل</option></select> <button class="delete-order" onclick="deleteOrder('${o.code}')">حذف</button></div>`).join(""):"<p>ما كاين حتى طلب.</p>";
  }catch(e){ showToast("❌ كلمة السر خاطئة أو السيرفر غير شغال") }
}

async function changeStatus(code,status){ 
  const p=$("adminPassword").value; 
  await fetch("/api/admin/orders/"+encodeURIComponent(code),{method:"PATCH",headers:{"Content-Type":"application/json","x-admin-password":p},body:JSON.stringify({status})}); 
  showToast("✅ تم تحديث الحالة"); 
}

async function deleteOrder(code){ 
  if(!confirm("تحب تحذف الطلب؟"))return; 
  const p=$("adminPassword").value; 
  await fetch("/api/admin/orders/"+encodeURIComponent(code),{method:"DELETE",headers:{"x-admin-password":p}}); 
  loadAdminOrders(); 
}

if($("adminLoadOrders")) $("adminLoadOrders").onclick=loadAdminOrders;

renderGames(); 
updateCartCount(); 
renderHero();
