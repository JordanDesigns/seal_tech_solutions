/* =====================================================================
   SEAL TECH SOLUTIONS — Interactions
   ===================================================================== */
(function () {
  "use strict";

  /* mark JS active so CSS can enable scroll-reveal (content stays visible if JS fails) */
  document.documentElement.classList.add("js");

  /* ---- Sticky header state ---- */
  const header = document.querySelector(".site-header");
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 20);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Mobile nav ---- */
  const toggle = document.querySelector(".nav-toggle");
  const closeNav = () => document.body.classList.remove("nav-open");
  if (toggle) {
    toggle.addEventListener("click", () =>
      document.body.classList.toggle("nav-open")
    );
  }
  document.querySelectorAll(".nav a").forEach((a) =>
    a.addEventListener("click", closeNav)
  );
  const scrim = document.querySelector(".scrim");
  if (scrim) scrim.addEventListener("click", closeNav);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
  });

  /* ---- Scroll reveal ---- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  /* ---- Animated counters ---- */
  const counters = document.querySelectorAll("[data-count]");
  const runCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const dur = 1500;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target * eased;
      el.textContent =
        (Number.isInteger(target) ? Math.round(val) : val.toFixed(1)) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (counters.length && "IntersectionObserver" in window) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCount(entry.target);
            cio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => cio.observe(c));
  } else {
    counters.forEach((c) => (c.textContent = c.dataset.count + (c.dataset.suffix || "")));
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll(".faq__q").forEach((q) => {
    q.addEventListener("click", () => {
      const item = q.closest(".faq__item");
      const ans = item.querySelector(".faq__a");
      const isOpen = item.classList.contains("open");
      // close siblings
      item.parentElement.querySelectorAll(".faq__item.open").forEach((o) => {
        o.classList.remove("open");
        o.querySelector(".faq__a").style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("open");
        ans.style.maxHeight = ans.scrollHeight + "px";
      }
    });
  });

  /* ---- Lightbox (gallery) ---- */
  const lightbox = document.querySelector(".lightbox");
  if (lightbox) {
    const lbInner = lightbox.querySelector(".lightbox__inner");
    const lbCap = lightbox.querySelector(".lightbox__cap");
    const open = (tile) => {
      const cap = tile.querySelector(".cap b");
      const sub = tile.querySelector(".cap span");
      const photo = tile.querySelector(".photo");
      // swap the clicked tile's photo (real before/after images) into the lightbox
      const current = lbInner.querySelector(".photo");
      if (photo && current) current.replaceWith(photo.cloneNode(true));
      if (lbCap) lbCap.textContent =
        (cap ? cap.textContent : "Seal-Tech Solutions") + (sub ? " — " + sub.textContent : "");
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
    };
    const close = () => {
      lightbox.classList.remove("open");
      document.body.style.overflow = "";
    };
    document.querySelectorAll(".gallery .tile").forEach((tile) => {
      tile.addEventListener("click", () => open(tile));
    });
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox || e.target.closest(".lightbox__close")) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }

  /* ---- Quote form (Formspree) ---- */
  const form = document.querySelector("#quote-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      const endpoint = form.getAttribute("action") || "";
      // If a real Formspree endpoint is configured, let it submit AJAX-style.
      if (endpoint.includes("formspree.io")) {
        e.preventDefault();
        const btn = form.querySelector('[type="submit"]');
        const original = btn ? btn.textContent : "";
        if (btn) { btn.textContent = "Sending…"; btn.disabled = true; }
        try {
          const res = await fetch(endpoint, {
            method: "POST",
            body: new FormData(form),
            headers: { Accept: "application/json" },
          });
          if (res.ok) {
            form.reset();
            const ok = form.querySelector(".form-success");
            if (ok) {
              ok.classList.add("show");
              ok.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          } else {
            alert("Something went wrong sending your request. Please call us instead.");
          }
        } catch {
          alert("Network error. Please call or email us directly.");
        } finally {
          if (btn) { btn.textContent = original; btn.disabled = false; }
        }
      }
      // Otherwise (placeholder endpoint) just show the success message as a demo.
      else {
        e.preventDefault();
        const ok = form.querySelector(".form-success");
        if (ok) {
          ok.classList.add("show");
          form.reset();
          ok.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    });
  }

  /* ---- Footer year ---- */
  const yr = document.querySelector("#year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
