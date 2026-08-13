const defaultGames=[{"id": 1, "name": "GTA V", "image": "images/game_1.svg", "price": 500, "visible": true}, {"id": 2, "name": "Red Dead Redemption 2", "image": "images/game_2.svg", "price": 500, "visible": true}, {"id": 3, "name": "God of War", "image": "images/game_3.svg", "price": 500, "visible": true}, {"id": 4, "name": "Marvel's Spider-Man", "image": "images/game_4.svg", "price": 500, "visible": true}, {"id": 5, "name": "The Last of Us Part II", "image": "images/game_5.svg", "price": 500, "visible": true}, {"id": 6, "name": "Ghost of Tsushima", "image": "images/game_6.svg", "price": 500, "visible": true}, {"id": 7, "name": "Horizon Zero Dawn", "image": "images/game_7.svg", "price": 500, "visible": true}, {"id": 8, "name": "Uncharted 4", "image": "images/game_8.svg", "price": 500, "visible": true}, {"id": 9, "name": "Spider-Man: Miles Morales", "image": "images/game_9.svg", "price": 500, "visible": true}, {"id": 10, "name": "Days Gone", "image": "images/game_10.svg", "price": 500, "visible": true}, {"id": 11, "name": "Detroit: Become Human", "image": "images/game_11.svg", "price": 500, "visible": true}, {"id": 12, "name": "Bloodborne", "image": "images/game_12.svg", "price": 500, "visible": true}, {"id": 13, "name": "The Witcher 3", "image": "images/game_13.svg", "price": 500, "visible": true}, {"id": 14, "name": "Assassin's Creed Odyssey", "image": "images/game_14.svg", "price": 500, "visible": true}, {"id": 15, "name": "Assassin's Creed Origins", "image": "images/game_15.svg", "price": 500, "visible": true}, {"id": 16, "name": "Far Cry 5", "image": "images/game_16.svg", "price": 500, "visible": true}, {"id": 17, "name": "Resident Evil 2", "image": "images/game_17.svg", "price": 500, "visible": true}, {"id": 18, "name": "Resident Evil 3", "image": "images/game_18.svg", "price": 500, "visible": true}, {"id": 19, "name": "Resident Evil 4", "image": "images/game_19.svg", "price": 500, "visible": true}, {"id": 20, "name": "Mortal Kombat 11", "image": "images/game_20.svg", "price": 500, "visible": true}, {"id": 21, "name": "Tekken 7", "image": "images/game_21.svg", "price": 500, "visible": true}, {"id": 22, "name": "Call of Duty: Modern Warfare", "image": "images/game_22.svg", "price": 500, "visible": true}, {"id": 23, "name": "Call of Duty: Black Ops III", "image": "images/game_23.svg", "price": 500, "visible": true}, {"id": 24, "name": "Battlefield 1", "image": "images/game_24.svg", "price": 500, "visible": true}, {"id": 25, "name": "Need for Speed Heat", "image": "images/game_25.svg", "price": 500, "visible": true}, {"id": 26, "name": "Gran Turismo Sport", "image": "images/game_26.svg", "price": 500, "visible": true}, {"id": 27, "name": "FIFA 23", "image": "images/game_27.svg", "price": 500, "visible": true}, {"id": 28, "name": "EA Sports FC 24", "image": "images/game_28.svg", "price": 500, "visible": true}, {"id": 29, "name": "Minecraft", "image": "images/game_29.svg", "price": 500, "visible": true}, {"id": 30, "name": "Crash Bandicoot N. Sane Trilogy", "image": "images/game_30.svg", "price": 500, "visible": true}];let games=JSON.parse(localStorage.getItem("fouadGames")||"null")||defaultGames;let cart=JSON.parse(localStorage.getItem("fouadCart")||"[]");const $=id=>document.getElementById(id);
const defaultSlides=["images/hero_collage.png","images/slide_1.svg","images/slide_2.svg","images/slide_3.svg","images/slide_4.svg","images/slide_5.svg"];
function save(){localStorage.setItem("fouadGames",JSON.stringify(games));localStorage.setItem("fouadCart",JSON.stringify(cart));}
function price(){return Math.floor(cart.length/3)*1000+(cart.length%3)*500;}
function renderGames(){const q=$("search").value.toLowerCase().trim();const list=games.filter(g=>g.visible!==false&&g.name.toLowerCase().includes(q));$("gamesGrid").innerHTML=list.map(g=>`<article class="card"><div class="cover"><img src="${g.image}" alt="${g.name}" loading="lazy" onerror="this.style.display='none';this.parentElement.textContent='🎮'"></div><div class="body"><h3>${g.name}</h3><div class="platform">PlayStation 4</div><div class="price">${g.price||500} دج</div><button class="add" onclick="addToCart(${g.id},this)">+ أضف للسلة</button></div></article>`).join("")||"<p>ما لقيناش اللعبة.</p>";}
function addToCart(id,btn){const g=games.find(x=>x.id===id);if(!g)return;cart.push(g);save();updateCartCount();btn.classList.remove("pop");void btn.offsetWidth;btn.classList.add("pop");showToast(`✅ ${g.name} تمت إضافتها للسلة`);}
function updateCartCount(){$("cartCount").textContent=cart.length;}function priceFmt(n){return n.toLocaleString("fr-DZ")+" دج";}
function renderCart(){$("count").textContent=cart.length;$("total").textContent=priceFmt(price());$("items").innerHTML=cart.length?cart.map((g,i)=>`<div class="row"><span>${g.name}</span><button class="remove" onclick="removeItem(${i})">حذف</button></div>`).join(""):"<p>السلة فارغة.</p>";$("checkout").classList.toggle("hidden",!cart.length);}
function removeItem(i){cart.splice(i,1);save();renderCart();updateCartCount();}function openCart(){$("cartModal").classList.remove("hidden");$("customerBox").classList.add("hidden");$("success").classList.add("hidden");renderCart();}
$("cartBtn").onclick=openCart;$("cartClose").onclick=()=>$("cartModal").classList.add("hidden");$("search").oninput=renderGames;$("checkout").onclick=()=>$("customerBox").classList.remove("hidden");
$("orderForm").onsubmit=async e=>{e.preventDefault();if(!cart.length)return;let code="FG-"+String(Date.now()).slice(-6);const order={name:$("name").value,phone:$("phone").value,games:cart.map(g=>g.name),total:price(),createdAt:new Date().toISOString(),status:"جديد"};let online=false;try{const r=await fetch("/api/orders",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(order)});if(r.ok){const x=await r.json();code=x.code;online=true}}catch(e){}if(!online){const orders=JSON.parse(localStorage.getItem("fouadOrders")||"[]");orders.push({...order,code});localStorage.setItem("fouadOrders",JSON.stringify(orders));}$("success").classList.remove("hidden");$("success").innerHTML=`✅ تم تسجيل الطلب<br>رقم الطلب: <strong>${code}</strong><br>احتفظ بالرمز، وتقدر تشوفه لاحقاً من «طلباتي».`;cart=[];save();renderCart();updateCartCount();e.target.reset();$("customerBox").classList.add("hidden");};
$("myOrdersBtn").onclick=()=>{const orders=JSON.parse(localStorage.getItem("fouadOrders")||"[]");$("orders").innerHTML=orders.length?orders.slice().reverse().map(o=>`<div class="order-card"><b>${o.code}</b><br><span class="status">${o.status}</span><br>${o.games.join(" • ")}<br><strong>${priceFmt(o.total)}</strong></div>`).join(""):"<p>ما عندك حتى طلب محفوظ في هذا المتصفح.</p>";$("ordersModal").classList.remove("hidden");};$("ordersClose").onclick=()=>$("ordersModal").classList.add("hidden");
function renderAdmin(){
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
 $("editImage").value="";
 $("editGameModal").classList.remove("hidden");
}
function toggleGame(i){games[i].visible=games[i].visible===false;save();renderGames();renderAdmin();}function deleteGame(i){if(confirm("تحب تحذف هذه اللعبة؟")){games.splice(i,1);save();renderGames();renderAdmin();}}
$("adminBtn").onclick=()=>{$("admin").classList.remove("hidden");renderAdmin();};$("adminClose").onclick=()=>$("admin").classList.add("hidden");
$("addGame").onsubmit=e=>{e.preventDefault();const f=$("gImage").files[0];if(!f)return;const r=new FileReader();r.onload=()=>{games.push({id:Date.now(),name:$("gName").value.trim(),image:r.result,price:Number($("gPrice").value)||500,visible:true});save();renderGames();renderAdmin();e.target.reset();showToast("✅ تمت إضافة اللعبة");};r.readAsDataURL(f);};
function showToast(text){const t=$("toast");t.textContent=text;t.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove("show"),1700);}
function renderHero(){const saved=JSON.parse(localStorage.getItem("fouadHeroSlides")||"null");const slides=(saved&&saved.length?saved:defaultSlides);$("heroSlides").innerHTML=slides.map((s,i)=>`<div class="hero-slide ${i===0?"active":""}" style="background-image:url('${s}')"></div>`).join("");let i=0;setInterval(()=>{const el=document.querySelectorAll(".hero-slide");if(!el.length)return;el[i].classList.remove("active");i=(i+1)%el.length;el[i].classList.add("active");},4500);}
$("heroFiles").addEventListener("change",e=>{const fs=[...e.target.files].slice(0,6);if(!fs.length)return;const out=[];let done=0;fs.forEach(f=>{const r=new FileReader();r.onload=()=>{out.push(r.result);done++;if(done===fs.length){localStorage.setItem("fouadHeroSlides",JSON.stringify(out));renderHero();showToast("🖼️ تم تحديث خلفية الموقع");}};r.readAsDataURL(f);});});
$("clearHero").onclick=()=>{localStorage.removeItem("fouadHeroSlides");location.reload();};

$("editClose").onclick=()=>$("editGameModal").classList.add("hidden");
$("editGameForm").onsubmit=e=>{
 e.preventDefault();
 const i=Number($("editId").value), g=games[i];
 if(!g)return;
 g.name=$("editName").value.trim();
 g.price=Number($("editPrice").value)||500;
 const f=$("editImage").files[0];
 if(f){
   const r=new FileReader();
   r.onload=()=>{g.image=r.result;save();renderGames();renderAdmin();$("editGameModal").classList.add("hidden");showToast("✅ تم تعديل اللعبة والغلاف");};
   r.readAsDataURL(f);
 }else{
   save();renderGames();renderAdmin();$("editGameModal").classList.add("hidden");showToast("✅ تم تعديل اللعبة");
 }
};

renderGames();updateCartCount();renderHero();

async function loadAdminOrders(){
 const p=$("adminPassword").value;if(!p){showToast("🔐 اكتب كلمة السر");return}
 try{const r=await fetch("/api/admin/orders",{headers:{"x-admin-password":p}});if(!r.ok)throw 0;const a=await r.json();
 $("adminOrders").innerHTML=a.length?a.map(o=>`<div class="admin-order"><b>${o.code}</b> — ${o.name} — ${o.phone}<br>${o.games.join(" • ")}<br><strong>${o.total.toLocaleString("fr-DZ")} دج</strong><br><select onchange="changeStatus('${o.code}',this.value)"><option ${o.status==="جديد"?"selected":""}>جديد</option><option ${o.status==="قيد التحضير"?"selected":""}>قيد التحضير</option><option ${o.status==="جاهز للاستلام"?"selected":""}>جاهز للاستلام</option><option ${o.status==="مكتمل"?"selected":""}>مكتمل</option></select> <button class="delete-order" onclick="deleteOrder('${o.code}')">حذف</button></div>`).join(""):"<p>ما كاين حتى طلب.</p>";
 }catch(e){showToast("❌ كلمة السر خاطئة أو السيرفر غير شغال")}
}
async function changeStatus(code,status){const p=$("adminPassword").value;await fetch("/api/admin/orders/"+encodeURIComponent(code),{method:"PATCH",headers:{"Content-Type":"application/json","x-admin-password":p},body:JSON.stringify({status})});showToast("✅ تم تحديث الحالة")}
async function deleteOrder(code){if(!confirm("تحب تحذف الطلب؟"))return;const p=$("adminPassword").value;await fetch("/api/admin/orders/"+encodeURIComponent(code),{method:"DELETE",headers:{"x-admin-password":p}});loadAdminOrders()}
$("adminLoadOrders").onclick=loadAdminOrders;
