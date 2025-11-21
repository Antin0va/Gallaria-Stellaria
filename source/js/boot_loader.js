(function () {
  /* ==========================================================================
     【配置区】在这里决定哪些页面显示加载动画
     ========================================================================== */
  
  // 获取当前页面的路径 (比如首页是 '/', 关于页是 '/about/')
   var currentPath = window.location.pathname;

//   // --- 方案 A：只在“首页”显示 (最常用) ---
//   // 逻辑：如果不是根路径 '/' 且不是 '/index.html'，则立即停止运行
//   if (currentPath !== '/' && currentPath !== '/index.html') {
//     return; 
//   }

  // --- 方案 B：在“首页”和“关于页”显示 (多页面指定) ---
  // 如果你想开启这个，请注释掉上面的方案 A，解开这个注释
  var allowedPaths = ['/about/'];
  // C++ 逻辑：if (!allowedPaths.contains(currentPath)) return;
  if (!allowedPaths.includes(currentPath)) {
    return;
  } 
/* --- 【核心新增】标记当前页面 --- */
  // 既然通过了上面的检查，说明这个页面需要动画
  // 我们给 html 标签加一个 class，作为 CSS 识别的信号
  document.documentElement.classList.add('is-loading-page');
  
/* --- UI 结构 --- */
  var loaderHtml = `
    <div id="rhine-loader">
      <div class="loader-content">
        <img src="https://cdn.jsdelivr.net/gh/Antin0va/Blog-images@main/img/202511211700397.png" class="loader-logo">
        <div class="loader-text">SYSTEM INITIALIZING...</div>
        <div class="progress-bar-track">
          <div class="progress-bar-fill" id="progress-bar"></div>
        </div>
      </div>
    </div>
  `;
  
  document.write(loaderHtml);

  /* --- 核心逻辑 (事件监听版) --- */
  document.addEventListener('DOMContentLoaded', function () {
    var loader = document.getElementById('rhine-loader');
    var bar = document.getElementById('progress-bar');
    
    if (loader && bar) {
      // 【核心修改】不再倒计时，而是监听“动画结束”事件
      // 当 CSS 的 width 从 0% 跑到 100% 结束时，浏览器会发个信号
      bar.addEventListener('animationend', function() {
        
        // 1. 收到信号：变绿
        loader.classList.add('loader-success');
        
        // 2. 展示 0.5秒 (500ms) 的绿色状态，然后揭开
        setTimeout(function() {
          loader.classList.add('loader-hide');
        }, 500);
      });
    }
  });
})();