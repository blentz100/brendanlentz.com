#  brendanlentz.com

### About

This repository contains the source code for my personal website and professional portfolio.

The main work I've done on this site is adding data tables and charts to visualize personal habit tracker data. The 
data is input using a React Native habit tracking app I built and continue to extend.

The site also serves as a place to:
- Experiment with modern web technologies and tooling
- Explore ideas that sometimes evolve into standalone products
- Showcase selected projects and experience

While the site began as a simple personal homepage, it has grown over time into a living project that I regularly 
use and extend.

### Live Site

- Production: https://brendanlentz.com

### Technical Architecture
- **Frontend:** React, TypeScript, Next.js
- **Data & Backend:** Supabase (Postgres, auth, row-level security)
- **Charts & Visualization:** Recharts / custom D3 components
- **Deployment:** Vercel with environment-based config

### Project Tracking & Work Management

This project is managed using GitHub Issues and GitHub Projects to mirror how work is tracked on production teams.

- Issues represent discrete units of work, including features, refactors, experiments, and bug fixes
- GitHub Projects provides a lightweight kanban-style view of:
  - ✅ Completed work
  - 🚧 In-progress tasks
  - 🧭 Backlog and future ideas

Each issue is intentionally scoped to be small and reviewable, making progress easy to track and changes easy to reason about over time.

This approach allows me to:
- Maintain clear historical context for why changes were made
- Prioritize work without over-planning
- Treat a personal project with the same discipline as a professional codebase

You can explore the current state of the project here:
- Project board: https://github.com/users/blentz100/projects/2

### Major Enhancements

Key work on this site includes:

- [HT-3: Add new Habit Line Chart component](https://github.com/blentz100/brendanlentz.com/pull/5)
- [HT-15: Add a replit-like console](https://github.com/users/blentz100/projects/2/views/1?filterQuery=HT-15&pane=issue&itemId=117453509&issue=blentz100%7Cbrendanlentz.com%7C21)
- [HT-31: Add string normalization tool](https://github.com/blentz100/brendanlentz.com/issues/33)
- [HT-37: Add email list signup widget](https://github.com/blentz100/brendanlentz.com/issues/37)
- [HT-30: Migrate from Google Sheets to Supabase](https://github.com/blentz100/brendanlentz.com/issues/30)

For a complete list of enhancements, see all [closed issues](https://github.com/blentz100/brendanlentz.com/issues?q=is%3Aissue+is%3Aclosed).


### Issue, Branch, and Commit Naming Convention

This repository uses a simple issue-based naming convention to keep work traceable across GitHub Issues, branches, pull requests, and commits.

Each unit of work is assigned a GitHub Issue and referenced using the following format:


#### Examples

- **Issue:** `PW-14`
- **Branch:** `pw-14-add-project-filtering`
- **Commit Header:** `PW-14 Add project filtering`
- **Pull Request:** `PW-14 Add project filtering`

#### Casing Conventions

- **Issues, commit messages, and PR titles** use an **uppercase** prefix (`PW-<number>`) for readability and consistency.
- **Branch names** use **lowercase only** to avoid case-sensitivity issues across operating systems and tools.

#### Historical Note

I previously used the `HT-` prefix during an earlier phase of the project. New work uses the `PW-` prefix going
forward to better reflect the current scope of the site. Existing issues and history have been left unchanged.

### Who This Project Is For

- **Potential Employers and Clients:** Demonstrates real-world engineering practices
- **Other Developers:** A reference for pragmatic, production-style personal projects
- **Myself:** Gives me a place to keep my skills sharp while building features that serve me personally and 
  professionally

### Background and Attribution

The original version of this site is a fork from Jake Jarvis’s personal site: jarv.is. I was drawn to the clarity of 
the design and the way it intentionally combined multiple technologies in a real, production-style setup.

Studying and evolving an existing, well-structured project was a deliberate learning exercise and mirrors how real-world software is often developed: by understanding, extending, and improving existing systems.


