/* ============ DATA ============ */
const categories = ["All","Music","Gaming","News","Live","Coding","Cricket","Podcasts","Comedy","Cooking","Travel","Recently uploaded","Watched"];
const channelNames = ["Byte Sized","Tech Trail","CodeCraft","Loop & Learn","Signal Path","Dev Diaries","Pixel Forge","The Algorithm","Circuit Notes","Quiet Static","Northbound","Everyday Eng","Nimbus Labs","Vantage Point","Field Notes"];
const titlePool = [
  "Building a Full Stack App From Scratch in 2026",
  "Why This Simple Trick Changed How I Study DSA",
  "I Tried Solving 100 Coding Problems in 7 Days",
  "The Truth About Placement Season Nobody Tells You",
  "React vs Vanilla JS — What Should You Actually Learn?",
  "How Signals & Systems Actually Applies to Real Jobs",
  "5 GATE Preparation Mistakes That Cost Me Marks",
  "Explaining Fourier Transforms Without the Headache",
  "This Is How Top Coders Debug Under Pressure",
  "A Calm Morning Routine for Exam Season",
  "Portfolio Website Tour — What Recruiters Notice First",
  "Java vs Python for Full Stack Roles in 2026",
  "How I Organized My DSA Sheet and Actually Finished It",
  "Inside a Real TCS NQT Interview Round",
  "Embedded Systems Explained With a Single ESP32 Project",
  "What Nobody Tells You About Internships",
  "The Most Underrated VS Code Extensions",
  "Lo-fi Coding Session — 2 Hours Focus Mix",
  "Rebuilding My Study Plan From Zero",
  "How Two Pointer Technique Actually Works",
  "Microcontroller Basics in Under 10 Minutes",
  "A Realistic Look at Life After Graduation",
  "Why I Switched My Whole Desktop Theme",
  "GATE 2026 Formula Sheet Walkthrough"
];

function randInt(a,b){return Math.floor(Math.random()*(b-a+1))+a;}
function randPick(arr){return arr[randInt(0,arr.length-1)];}
function timeAgo(){const opts=["2 hours ago","5 hours ago","1 day ago","2 days ago","4 days ago","1 week ago","2 weeks ago","3 weeks ago","1 month ago","3 months ago","6 months ago","1 year ago"];return randPick(opts);}
function viewsFmt(){const n=randInt(800,4200000); if(n>1000000) return (n/1000000).toFixed(1)+"M views"; if(n>1000) return Math.round(n/1000)+"K views"; return n+" views";}
function durationFmt(){const m=randInt(1,42), s=randInt(0,59); return m+":"+String(s).padStart(2,"0");}

let videos = [];
function buildVideos(){
  videos = titlePool.map((t,i)=>{
    const cat = categories[randInt(1,categories.length-1)];
    const ch = channelNames[i % channelNames.length];
    return {
      id: "v"+i,
      title: t,
      channel: ch,
      category: cat,
      views: viewsFmt(),
      time: timeAgo(),
      duration: durationFmt(),
      thumb: `https://picsum.photos/seed/clonevid${i}/640/360`,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(ch)}&background=random&color=fff&bold=true`,
      subs: randInt(1,890)+"K subscribers",
      likes: randInt(120,98000)
    };
  });
}
buildVideos();

const commentAuthors = ["Ananya R","Rahul K","Sirisha M","Vikram S","Divya P","Kiran T","Sneha V","Arjun N"];
const commentPool = [
  "This actually helped me understand it so much better, thanks!",
  "Waiting for a part 2 on this, please make one soon.",
  "The pacing here is perfect, not too fast not too slow.",
  "I wish I found this before my exam last week 😅",
  "Underrated channel, this deserves way more views.",
  "Can you cover this topic in Python as well?",
  "Saved this for revision, exactly what I needed.",
  "The explanation around the middle really clicked for me."
];

/* ============ THEME ============ */
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeLabel = document.getElementById('themeLabel');
const themeIcon = document.getElementById('themeIcon');
const sunPath = "M12 7a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0-5h0v2h0zm0 18h0v2h0zM4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2m16 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42";
const moonPath = "M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z";

function applyTheme(theme){
  html.setAttribute('data-theme', theme);
  localStorage.setItem('clone-theme', theme);
  themeLabel.textContent = theme === 'dark' ? 'Dark' : 'Light';
  themeIcon.innerHTML = `<path d="${theme==='dark'?moonPath:sunPath}"/>`;
}
applyTheme(localStorage.getItem('clone-theme') || 'dark');
themeToggle.addEventListener('click', ()=>{
  applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

/* ============ SIDEBAR ============ */
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('mainContent');
const hamburgerBtn = document.getElementById('hamburgerBtn');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function isMobile(){ return window.innerWidth <= 900; }

hamburgerBtn.addEventListener('click', ()=>{
  if(isMobile()){
    sidebar.classList.toggle('mobile-open');
    sidebarOverlay.style.display = sidebar.classList.contains('mobile-open') ? 'block' : 'none';
  } else {
    sidebar.classList.toggle('mini');
    mainContent.classList.toggle('mini-margin');
  }
});
sidebarOverlay.addEventListener('click', ()=>{
  sidebar.classList.remove('mobile-open');
  sidebarOverlay.style.display = 'none';
});
document.getElementById('logoBtn').addEventListener('click', (e)=>{ e.preventDefault(); showHome(); });

/* subs list */
const subsSection = document.getElementById('subsSection');
subsSection.innerHTML = `<div class="section-title">Subscriptions</div>` + channelNames.slice(0,6).map(c=>`
  <a href="#" class="side-item">
    <span class="badge-avatar"><img src="https://ui-avatars.com/api/?name=${encodeURIComponent(c)}&background=random&color=fff" alt=""></span>
    <span class="label">${c}</span>
  </a>`).join("");

/* explore list */
const exploreIcons = {
  "Trending":"M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.48 2.54l2.6 1.53c.56-1.24.88-2.62.88-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.05.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C17.15 17.8 14.75 19 12 19z",
  "Music":"M12 3v10.55A4 4 0 1 0 14 17V7h4V3z",
  "Movies & TV":"M4 4h16v16H4z",
  "Live":"M12 8a4 4 0 1 0 4 4 4 4 0 0 0-4-4zM4.93 4.93 3.51 6.34A9 9 0 0 0 3 12a9 9 0 0 0 .51 5.66l1.42-1.41A7 7 0 0 1 5 12a7 7 0 0 1 -.07-7.07zm14.14 0A7 7 0 0 1 21 12a7 7 0 0 1-.53 5.25l1.42 1.41A9 9 0 0 0 22.5 12a9 9 0 0 0-2.02-7.66z",
  "Gaming":"M15 7.5H9a5.5 5.5 0 0 0 0 11h6a5.5 5.5 0 0 0 0-11zm-4 4H9.5V13H8v-1.5H6.5V10H8V8.5h1.5V10H11zm3.75 2.25a1.25 1.25 0 1 1 1.25-1.25 1.25 1.25 0 0 1-1.25 1.25zm2-3a1.25 1.25 0 1 1 1.25-1.25 1.25 1.25 0 0 1-1.25 1.25z",
  "News":"M20 3H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM6 8h8v2H6zm0 4h8v2H6zm10 4H6v-2h10zm0-6h2v2h-2z",
  "Sports":"M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm5.66 5.27-2.3 1.9-1.1-2.86 1.53-1.92a8.05 8.05 0 0 1 1.87 2.88zM12 4a8 8 0 0 1 2.14.3l-1.6 2H11l-1.6-2.06A8 8 0 0 1 12 4zM6.2 6.36l1.55 1.98-1.1 2.87-2.32-1.92A8.05 8.05 0 0 1 6.2 6.36zM4 12a8 8 0 0 1 .1-1.27l2.73 2.26-1.05 3.24-1.5-.14A7.96 7.96 0 0 1 4 12zm4.5 6.2-.4-3.34 2.8-1 2.13 1.83-1.2 2.9a8.05 8.05 0 0 1-3.33-.39zm5.63.4-1.2-2.9 2.13-1.84 2.8 1-.4 3.35a8.05 8.05 0 0 1-3.33.4zm5.97-3.6-1.5.13-1.05-3.24 2.73-2.25c.07.41.1.83.1 1.26a7.96 7.96 0 0 1-.28 4.1z",
  "Courses":"M12 3 1 9l11 6 9-4.91V17h2V9zM5 13.18v4L12 21l7-3.82v-4L12 17z"
};
const exploreList = document.getElementById('exploreList');
exploreList.innerHTML = Object.keys(exploreIcons).map(name=>`
  <a href="#" class="side-item" data-explore="${name}">
    <svg viewBox="0 0 24 24"><path d="${exploreIcons[name]}"/></svg>
    <span class="label">${name}</span>
  </a>`).join("");

/* ============ CHIPS ============ */
const chipsRow = document.getElementById('chipsRow');
let activeCategory = "All";
chipsRow.innerHTML = categories.map(c=>`<div class="chip ${c==='All'?'active':''}" data-cat="${c}">${c}</div>`).join("");
chipsRow.addEventListener('click', (e)=>{
  const chip = e.target.closest('.chip');
  if(!chip) return;
  document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
  chip.classList.add('active');
  activeCategory = chip.dataset.cat;
  renderGrid();
});

/* ============ VIDEO GRID ============ */
const videoGrid = document.getElementById('videoGrid');
let searchTerm = "";

function renderGrid(){
  let list = videos;
  if(activeCategory !== "All") list = list.filter(v=>v.category===activeCategory);
  if(searchTerm) list = list.filter(v=>v.title.toLowerCase().includes(searchTerm) || v.channel.toLowerCase().includes(searchTerm));

  if(list.length === 0){
    videoGrid.innerHTML = "";
    videoGrid.insertAdjacentHTML('afterend', '');
    videoGrid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">No results found. Try a different search or category.</div>`;
    return;
  }

  videoGrid.innerHTML = list.map(v=>`
    <div class="video-card" data-id="${v.id}">
      <div class="thumb-wrap">
        <img src="${v.thumb}" alt="${v.title}" loading="lazy">
        <span class="duration">${v.duration}</span>
      </div>
      <div class="video-meta">
        <div class="ch-avatar"><img src="${v.avatar}" alt="${v.channel}"></div>
        <div class="video-info">
          <div class="video-title">${v.title}</div>
          <div class="video-sub">
            <span class="channel-name">${v.channel}</span>
            <span>${v.views} • ${v.time}</span>
          </div>
        </div>
      </div>
    </div>`).join("");
}
renderGrid();

videoGrid.addEventListener('click', (e)=>{
  const card = e.target.closest('.video-card');
  if(!card) return;
  openWatch(card.dataset.id);
});

/* ============ SEARCH ============ */
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
searchForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  searchTerm = searchInput.value.trim().toLowerCase();
  showHome();
  renderGrid();
});
document.getElementById('mobileSearchBtn').addEventListener('click', ()=>{
  const q = prompt("Search Clone");
  if(q !== null){
    searchTerm = q.trim().toLowerCase();
    searchInput.value = q;
    showHome();
    renderGrid();
  }
});

/* ============ HOME / WATCH SWITCH ============ */
const homeView = document.getElementById('homeView');
const watchView = document.getElementById('watchView');
function showHome(){
  homeView.style.display = 'block';
  watchView.style.display = 'none';
  window.scrollTo({top:0, behavior:'smooth'});
}
function showWatch(){
  homeView.style.display = 'none';
  watchView.style.display = 'block';
  window.scrollTo({top:0, behavior:'smooth'});
}
document.getElementById('backBtn').addEventListener('click', showHome);

/* ============ WATCH PAGE ============ */
let currentVideo = null;
let subscribed = false;
let liked = false;
let likeCount = 0;
let commentsData = [];

function openWatch(id){
  currentVideo = videos.find(v=>v.id===id);
  if(!currentVideo) return;
  subscribed = false;
  liked = false;
  likeCount = currentVideo.likes;

  document.getElementById('playerImg').src = currentVideo.thumb;
  document.getElementById('watchTitle').textContent = currentVideo.title;
  document.getElementById('watchChAvatar').src = currentVideo.avatar;
  document.getElementById('watchChName').textContent = currentVideo.channel;
  document.getElementById('watchChSubs').textContent = currentVideo.subs;
  document.getElementById('watchMeta').textContent = `${currentVideo.views} • ${currentVideo.time}`;
  document.getElementById('watchDesc').textContent = `A closer look at "${currentVideo.title.toLowerCase()}" — thanks for watching! Drop a comment below with your thoughts or questions, and don't forget to subscribe for more videos like this one.`;
  document.getElementById('likeCount').textContent = formatCount(likeCount);
  document.getElementById('subscribeBtn').classList.remove('subscribed');
  document.getElementById('subscribeBtn').textContent = 'Subscribe';
  document.getElementById('likeBtn').style.color = '';

  // comments
  commentsData = Array.from({length: randInt(3,6)}).map(()=>({
    author: randPick(commentAuthors),
    text: randPick(commentPool),
    likes: randInt(0,340),
    time: timeAgo()
  }));
  renderComments();

  // related
  const related = videos.filter(v=>v.id!==id).sort(()=>Math.random()-0.5).slice(0,10);
  document.getElementById('relatedList').innerHTML = related.map(v=>`
    <div class="related-card" data-id="${v.id}">
      <div class="thumb-wrap">
        <img src="${v.thumb}" alt="${v.title}">
        <span class="duration">${v.duration}</span>
      </div>
      <div class="video-info">
        <div class="video-title">${v.title}</div>
        <div class="video-sub">
          <span class="channel-name">${v.channel}</span>
          <span>${v.views} • ${v.time}</span>
        </div>
      </div>
    </div>`).join("");

  showWatch();
}

document.getElementById('relatedList').addEventListener('click', (e)=>{
  const card = e.target.closest('.related-card');
  if(!card) return;
  openWatch(card.dataset.id);
});

function formatCount(n){
  if(n >= 1000) return (n/1000).toFixed(1).replace(/\.0$/,'') + "K";
  return String(n);
}

document.getElementById('subscribeBtn').addEventListener('click', function(){
  subscribed = !subscribed;
  this.classList.toggle('subscribed', subscribed);
  this.textContent = subscribed ? 'Subscribed' : 'Subscribe';
});

document.getElementById('likeBtn').addEventListener('click', function(){
  liked = !liked;
  likeCount = currentVideo.likes + (liked ? 1 : 0);
  document.getElementById('likeCount').textContent = formatCount(likeCount);
  this.style.color = liked ? '#3ea6ff' : '';
});

let playing = false;
document.getElementById('playPauseBtn').addEventListener('click', function(){
  playing = !playing;
  document.getElementById('playIcon').innerHTML = playing
    ? '<path d="M6 5h4v14H6zm8 0h4v14h-4z"/>'
    : '<path d="M8 5v14l11-7z"/>';
});

/* comments */
function renderComments(){
  document.getElementById('commentsCount').textContent = commentsData.length + " Comments";
  document.getElementById('commentsList').innerHTML = commentsData.map(c=>`
    <div class="comment">
      <div class="ch-avatar"><img src="https://ui-avatars.com/api/?name=${encodeURIComponent(c.author)}&background=random&color=fff" alt=""></div>
      <div>
        <div class="comment-author">${c.author} <span>${c.time}</span></div>
        <div class="comment-text">${c.text}</div>
        <div class="comment-likes">
          <svg viewBox="0 0 24 24"><path d="M1 21h4V9H1zm22-11a2 2 0 0 0-2-2h-6.31l.95-4.57.03-.32a1.5 1.5 0 0 0-.44-1.06L14.17 1 7.59 7.59A2 2 0 0 0 7 9v10a2 2 0 0 0 2 2h9a2 2 0 0 0 1.84-1.21l3.02-7.05c.09-.23.14-.47.14-.74z"/></svg>
          ${c.likes}
          <svg viewBox="0 0 24 24" style="transform:scaleX(-1) scaleY(-1)"><path d="M1 21h4V9H1zm22-11a2 2 0 0 0-2-2h-6.31l.95-4.57.03-.32a1.5 1.5 0 0 0-.44-1.06L14.17 1 7.59 7.59A2 2 0 0 0 7 9v10a2 2 0 0 0 2 2h9a2 2 0 0 0 1.84-1.21l3.02-7.05c.09-.23.14-.47.14-.74z"/></svg>
          Reply
        </div>
      </div>
    </div>`).join("");
}

const commentInput = document.getElementById('commentInput');
commentInput.addEventListener('keydown', (e)=>{
  if(e.key === 'Enter' && commentInput.value.trim()){
    commentsData.unshift({author:"You", text: commentInput.value.trim(), likes:0, time:"Just now"});
    commentInput.value = "";
    renderComments();
  }
});

/* explore chip linking */
exploreList.addEventListener('click', (e)=>{
  const item = e.target.closest('[data-explore]');
  if(!item) return;
  e.preventDefault();
  const name = item.dataset.explore;
  const matchChip = document.querySelector(`.chip[data-cat="${name.split(' ')[0]}"]`);
  showHome();
  if(matchChip){
    document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
    matchChip.classList.add('active');
    activeCategory = matchChip.dataset.cat;
  } else {
    activeCategory = "All";
  }
  renderGrid();
});

/* close mobile sidebar on nav click */
document.querySelectorAll('.side-item').forEach(item=>{
  item.addEventListener('click', (e)=>{
    if(item.dataset.page === 'home'){ e.preventDefault(); showHome(); }
    if(isMobile()){
      sidebar.classList.remove('mobile-open');
      sidebarOverlay.style.display = 'none';
    }
  });
});

window.addEventListener('resize', ()=>{
  if(!isMobile()){
    sidebar.classList.remove('mobile-open');
    sidebarOverlay.style.display = 'none';
  }
});
