<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application rules
- Maintain the storefront at the index route, with its own social metadata, so the first page is the catalog.
- Keep palette, typography and layout rules in src/styles.css; page controls use the shared Button component for consistency.
- Catalog data is currently a static list and product dialogs are informational only; do not imply payment or order processing exists without a connected commerce service.
