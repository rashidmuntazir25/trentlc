/* ============================================================
   Trent LC — Site JavaScript (vanilla, no dependencies)
   ------------------------------------------------------------
   1. Mobile navigation toggle
   2. Header shadow on scroll
   3. FAQ accordion (accessible, animated)
   ============================================================ */

(function () {
  "use strict";

  /* 1. MOBILE NAVIGATION -----------------------------------
     Toggles the collapsed menu and keeps aria-expanded honest
     so assistive tech announces the open/closed state.        */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    // Close the menu after choosing a destination
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }


  /* 2. HEADER SHADOW ON SCROLL ------------------------------
     Adds a hairline + shadow once the page leaves the top.    */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }


  /* 3. FAQ ACCORDION ----------------------------------------
     Each question is a real <button> that controls its panel.
     Panels animate open/closed via max-height; questions can
     be opened independently of one another.                   */
  var items = document.querySelectorAll(".faq-item");

  Array.prototype.forEach.call(items, function (item) {
    var btn = item.querySelector(".faq-question");
    var panel = item.querySelector(".faq-panel");
    if (!btn || !panel) return;

    btn.addEventListener("click", function () {
      var isOpen = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(isOpen));
      // Set an explicit pixel height so the CSS transition runs
      panel.style.maxHeight = isOpen ? panel.scrollHeight + "px" : null;
    });
  });

  /* Keep open panels correctly sized if the viewport changes
     (e.g. text reflows when the window is resized).           */
  window.addEventListener("resize", function () {
    Array.prototype.forEach.call(
      document.querySelectorAll(".faq-item.is-open .faq-panel"),
      function (panel) { panel.style.maxHeight = panel.scrollHeight + "px"; }
    );
  });

  /* If the page is opened with a hash that points at a FAQ item
     (e.g. faq.html#certificate), open that item automatically. */
  function openFromHash() {
    if (!location.hash) return;
    var target = document.querySelector(location.hash);
    var item = target && target.closest ? target.closest(".faq-item") : null;
    if (item && !item.classList.contains("is-open")) {
      var btn = item.querySelector(".faq-question");
      if (btn) btn.click();
    }
  }
  openFromHash();
  window.addEventListener("hashchange", openFromHash);
})();
