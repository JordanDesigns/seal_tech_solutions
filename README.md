# Seal Tech Solutions — Website

A fast, modern, mobile-friendly static website for **Seal Tech Solutions** — Interlock Repair, Sealing & Interlocking. Built with plain HTML/CSS/JS (no build step), so it can be hosted anywhere.

## Pages
| File | Purpose |
|------|---------|
| `index.html` | Home — hero, services overview, why-us, process, gallery preview, reviews + Google review CTA, service areas |
| `services.html` | All four services, each with its own distinct layout (Repair, Sealing, Interlocking, Landscaping) + FAQ |
| `about.html` | Company story, why they began, values & community |
| `gallery.html` | Portfolio grid with click-to-enlarge lightbox |
| `contact.html` | Free-quote form (Formspree) + contact info |

## ✅ Before going live — swap these placeholders

Use Find & Replace across all `.html` files:

1. **Phone number** — replace `(000) 000-0000` (display) and `+10000000000` (in `tel:` links) with the real number.
2. **Email** — replace `info@sealtechsolutions.ca` with the real address.
3. **Google review link** — replace every `https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID`
   with your real Google review short-link. To get it:
   - Go to your Google Business Profile → **Ask for reviews** → copy the short link (looks like `https://g.page/r/XXXXXXXX/review`).
4. **Contact form (Formspree)** — in `contact.html`, replace `YOUR_FORM_ID` in the form's `action`:
   - Sign up free at <https://formspree.io>, create a form, copy its endpoint (e.g. `https://formspree.io/f/abcdwxyz`).
   - Paste it into `action="https://formspree.io/f/abcdwxyz"`.
   - Until you do, the form just shows a demo "thank you" message without sending.
5. **Social links** — update the `href="#"` on the Facebook / Instagram / Google icons in the footer.

## 📷 Photos

The **gallery**, the **homepage** (hero video, "Why" before/after, gallery preview) and the **services** Repair/Interlocking medias now use real project photos, stored in `assets/projects/` with clear `*-before.jpg` / `*-after.jpg` names. The poolside project has no "before", so it shows as a single after image.

**Still placeholder:** the About-page photos (owner/team + community) and the Services → Landscaping section (currently a text service-list; landscaping before/afters do live in the gallery). To add real photos:

### Single photos (hero, about page)
1. Drop your images into the `assets/` folder.
2. Find a placeholder block in the HTML — it looks like:
   ```html
   <div class="photo"><div class="photo__label">…</div></div>
   ```
3. Replace it with an image, e.g.:
   ```html
   <div class="photo"><img src="assets/driveway-burlington.jpg" alt="Finished interlock driveway in Burlington" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"></div>
   ```
   (Keep the wrapping `<div class="photo">` so the sizing/rounded corners stay intact.)

### Before / After photos (gallery + service pages)
Each portfolio tile is a two-pane **before/after** placeholder:
```html
<div class="photo photo--ba">
  <div class="ba-pane"><span class="ba-lab">Before</span></div>
  <div class="ba-pane ba-pane--after"><span class="ba-lab">After</span></div>
</div>
```
To insert real images, add an `<img>` to each pane (keep the `<span class="ba-lab">` so the Before/After label stays):
```html
<div class="photo photo--ba">
  <div class="ba-pane"><img src="assets/driveway-before.jpg" alt="Driveway before" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"><span class="ba-lab">Before</span></div>
  <div class="ba-pane ba-pane--after"><img src="assets/driveway-after.jpg" alt="Driveway after" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"><span class="ba-lab">After</span></div>
</div>
```

**Highest-impact photos to add first:** the home "Why" before/after, and 3–4 gallery before/after pairs.

### Hero media
- The hero **card** (right side of the home hero) plays a looping video: `assets/sts-hero.mp4` (autoplay, muted, loops). To swap it, replace that file or update the `<video>` `src` in `index.html`. Tip: add a `poster="assets/hero-poster.jpg"` attribute so a still shows while the video loads, and keep the file lean (~5–10 MB) for fast mobile loading.
- The hero **background** is currently a charcoal gradient (`.hero__bg::before` in `css/styles.css`). When you supply the background photo, drop it in `assets/` and we'll layer it behind the gradient.

## 🚀 Hosting (free options)

- **Netlify** — drag-and-drop this whole folder onto <https://app.netlify.com/drop>. Done. (Bonus: Netlify Forms can replace Formspree.)
- **Vercel** — `vercel` CLI or drag-and-drop import.
- **GitHub Pages** — push the folder to a repo, enable Pages.
- **Cloudflare Pages** — connect a repo or upload directly.

After hosting, point the custom domain (e.g. `sealtechsolutions.ca`) at it through your host's domain settings.

## SEO notes
- Each page has a unique `<title>` and meta description targeting the service + cities.
- The home page includes LocalBusiness structured data (`GeneralContractor`) — update the phone/email/rating in that `<script type="application/ld+json">` block once real.
- To rank locally, also: create/verify a **Google Business Profile**, keep the name/address/phone identical everywhere, and collect Google reviews (the CTAs throughout drive this).

## Design system
- **Colors (Seal-Tech brand):** charcoal `#373938`, taupe `#837669`, grey `#8b8c8c`, and white. Defined as CSS variables at the top of `css/styles.css` (the variable names like `--navy`/`--accent` are kept from the original system but repointed to the brand colors, so changing them in one place updates the whole site).
- **Logo:** the dark-wordmark lockup (`assets/sts-logo-dark.png`) is used in the white header; the original (`assets/sts-logo.png`) is white-filtered via CSS for the dark footer.
- **Fonts:** Archivo (headings) + Manrope (body), loaded from Google Fonts.
- **Texture:** custom herringbone-paver pattern (a nod to interlock) used in hero and CTA bands.

## Notes on content
- Job-count / rating "stat" sections were intentionally left off for now. When you've built up real Google reviews, we can add genuine testimonials and a star rating — the review-collection CTAs are already in place throughout the site to help gather them.
