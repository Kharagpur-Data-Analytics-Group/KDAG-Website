# Comparison with main:frontend

Baseline: `main` at `5db2b0a`. Changes are in `main-backup:newfrontend`; `frontend` was not edited.

## User-requested exceptions

The updated team and alumni pages, rosters, 2026 alumni batch, cards and layout from `main-backup:newfrontend` were restored at the user’s request after the baseline comparison. Differences on `/team` and `/alumni` are intentional. Earlier JSX import and syntax fixes remain.

## Result and limits

DataForge now uses the original DataForge 2026 desktop/mobile banners, description, deadline, prize information, ARC-TASK-GEN link, Unstop destination, closed-registration notice, optional GitHub username, and collapsed repository guide. The registration success page, login destinations and actual team dashboard match the original source again.

This is a source, stylesheet-value, route and rendered-content audit. **It is not a pixel-by-pixel browser certification.** Browser access was unavailable. Authenticated API states, actual Google sign-in, team mutations, certificate downloads and device screenshots still require live verification. No real user records were created or changed during checks.

## Checks

- Compared all 123 original JavaScript/JSON files with their migrated counterparts, allowing `.js`/`.jsx` naming, component extraction and Vite environment differences.
- Checked all 28 original route paths and their component destinations: no missing or changed destinations. `/register-kdsh` remains an additional alias for `/register-hackathon`.
- Compared initial anonymous rendered text and links for 28 route representations before the requested team/alumni restoration: all matched. Team/alumni differences are now intentional exceptions.
- Verified all 204 original source assets and 239 public files against the baseline by SHA-256: no missing or different files.
- Parsed the restored JSX and checked 1783 Tailwind candidates at the most recent compiler check: none rejected.
- Production build passes. Existing third-party Owl Carousel CSS and bundle-size warnings remain.
- Verified DataForge content/banners/links, guide open/close and optional GitHub input in an isolated DOM check. Navbar checks cover five route/login states. An isolated StrictMode callback check confirms one authorization-code exchange, using a mocked response.

## Corrections

- Restored original registration, success, repository guide and privacy-policy content instead of the old KDSH or rewritten text.
- Retained the updated branch team/alumni pages and lists as requested. Restored the original team-management component and notices, and removed fabricated forum fallback data.
- Restored confirmed layout differences in resource cards/header/list, ML sheet/progress sections, certificate form, guidelines, discussion forms/cards, login prompt, contact cards and logout control.
- Converted those original component stylesheet values into literal Tailwind utilities, keeping necessary keyframes, font imports and custom properties. Existing equivalent implementations, including blog styles and most winter-workshop components, were retained.
- Restored the shared background/text colors and smooth scrolling formerly supplied by original globally imported styles.
- Kept migration fixes, valid SVG properties, the document loader's error handling and registration alias. Added an OAuth effect guard so React 18 development effect replay does not exchange the same authorization code twice.
- Did not rename folders, change dependencies/configuration, deploy, or merge.

## Rendered route comparisons

These compare initial HTML text and link targets; animations are not a screenshot test, and API/particle effects are excluded.

| Route | Text | Links |
| --- | --- | --- |
| `/` | Match | Match |
| `/events` | Match | Match |
| `/blogs` | Match | Match |
| `/resources` | Match | Match |
| `/gallery` | Match | Match |
| `/team` | Match | Match |
| `/alumni` | Match | Match |
| `/ml_sheet` | Match | Match |
| `/auth` | Match | Match |
| `/register` | Match | Match |
| `/register-hackathon` | Match | Match |
| `/register-success` | Match | Match |
| `/manage-team` | Match | Match |
| `/privacy-policy` | Match | Match |
| `/community-guidelines` | Match | Match |
| `/winter-workshop` | Match | Match |
| `/certificate` | Match | Match |
| `/KDSH2022` | Match | Match |
| `/forum` | Match | Match |
| `/google-auth/callback?code=fixture` | Match | Match |
| `/edit_profile/user-1` | Match | Match |
| `/create_discussion` | Match | Match |
| `/create_comment/post-1/1` | Match | Match |
| `/user_profile_self/user-1` | Match | Match |
| `/user_profile_public/user-1` | Match | Match |
| `/discussion_page/post-1/0` | Match | Match |
| `/events-gallery/test-event` | Match | Match |
| `/missing-route` | Match | Match |

## Per-file source inventory

“Retained” means the migration structure was preserved after comparison; it does not claim live visual verification. Stylesheet differences cannot be certified from this table alone.

| Original file under `main:frontend/src` | Counterpart under `newfrontend/src` | Action |
| --- | --- | --- |
| `App.js` | `App.jsx` | Compared; retained matching logic/content and migration structure. |
| `App.test.js` | `App.test.js` | Compared; retained matching logic/content and migration structure. |
| `Router/AppRouter.js` | `Router/AppRouter.jsx` | Original route components restored; previous registration URL retained as an alias. |
| `components/AlumniPage/AlumniPage.js` | `components/AlumniPage/AlumniPage.jsx` | Updated branch version retained at user request; earlier migration fixes preserved. |
| `components/AlumniPage/AlumniPageHeading.js` | `components/AlumniPage/AlumniPageHeader.jsx` | Updated branch version retained at user request; earlier migration fixes preserved. |
| `components/AlumniPage/AlumniStatic2016.js` | `components/AlumniPage/AlumniStatic2016.jsx` | Updated branch version retained at user request; earlier migration fixes preserved. |
| `components/AlumniPage/AlumniStatic2017.js` | `components/AlumniPage/AlumniStatic2017.jsx` | Updated branch version retained at user request; earlier migration fixes preserved. |
| `components/AlumniPage/AlumniStatic2018.js` | `components/AlumniPage/AlumniStatic2018.jsx` | Updated branch version retained at user request; earlier migration fixes preserved. |
| `components/AlumniPage/AlumniStatic2019.js` | `components/AlumniPage/AlumniStatic2019.jsx` | Updated branch version retained at user request; earlier migration fixes preserved. |
| `components/AlumniPage/AlumniStatic2020.js` | `components/AlumniPage/AlumniStatic2020.jsx` | Updated branch version retained at user request; earlier migration fixes preserved. |
| `components/AlumniPage/AlumniStatic2021.js` | `components/AlumniPage/AlumniStatic2021.jsx` | Updated branch version retained at user request; earlier migration fixes preserved. |
| `components/AlumniPage/AlumniStatic2022.js` | `components/AlumniPage/AlumniStatic2022.jsx` | Updated branch version retained at user request; earlier migration fixes preserved. |
| `components/AlumniPage/AlumniStatic2023.js` | `components/AlumniPage/AlumniStatic2023.jsx` | Updated branch version retained at user request; earlier migration fixes preserved. |
| `components/AlumniPage/AlumniStatic2024.js` | `components/AlumniPage/AlumniStatic2024.jsx` | Updated branch version retained at user request; earlier migration fixes preserved. |
| `components/AlumniPage/AlumniStatic2025.js` | `components/AlumniPage/AlumniStatic2025.jsx` | Updated branch version retained at user request; earlier migration fixes preserved. |
| `components/AlumniPage/Header.js` | `components/AlumniPage/Header.jsx` | Updated branch version retained at user request; earlier migration fixes preserved. |
| `components/AlumniPage/TeamCardAlumni.js` | `components/AlumniPage/TeamCardAlumni.jsx` | Updated branch version retained at user request; earlier migration fixes preserved. |
| `components/AuthenticationPages/AuthPage.js` | `components/AuthenticationPages/AuthPage.jsx` | Restored original content/behavior and original style values in Tailwind. |
| `components/AuthenticationPages/AuthStatus.js` | `components/AuthenticationPages/AuthStatus.jsx` | Compared; retained matching logic/content and migration structure. |
| `components/AuthenticationPages/GoogleCallback.js` | `components/AuthenticationPages/GoogleCallback.jsx` | Restored original content/behavior and original style values in Tailwind. |
| `components/AuthenticationPages/Register.js` | `components/AuthenticationPages/Register.jsx` | Restored original content/behavior and original style values in Tailwind. |
| `components/Blog/BlogPage.js` | `components/Blog/BlogPage.jsx` | Compared; retained matching logic/content and migration structure. |
| `components/Blog/Blogs/BlogCard.js` | `components/Blog/Blogs/BlogCard.jsx` | Compared; retained equivalent refactoring/migration structure. Visual check remains outstanding. |
| `components/Blog/Blogs/BlogList.js` | `components/Blog/Blogs/BlogList.jsx` | Compared; retained equivalent refactoring/migration structure. Visual check remains outstanding. |
| `components/Blog/Blogs/BlogsStatic.js` | `components/Blog/Blogs/BlogsStatic.jsx` | Compared; retained matching logic/content and migration structure. |
| `components/Blog/Header/Header.js` | `components/Blog/Header/Header.jsx` | Compared; retained equivalent refactoring/migration structure. Visual check remains outstanding. |
| `components/CertificateGeneration/CertificateGeneration.js` | `components/CertificateGeneration/CertificateGeneration.jsx` | Restored original content/behavior and original style values in Tailwind. |
| `components/CertificateGeneration/CertificateStarGuide.js` | `components/CertificateGeneration/CertificateStarGuide.jsx` | Compared; retained matching logic/content and migration structure. |
| `components/CertificateGeneration/Header/Header.js` | `components/CertificateGeneration/Header/Header.jsx` | Compared; retained matching logic/content and migration structure. |
| `components/CertificateGeneration/certificates.js` | `components/CertificateGeneration/certificates.jsx` | Compared; retained matching logic/content and migration structure. |
| `components/Common/Footer/Footer.js` | `components/Common/Footer/Footer.jsx` | Compared; retained equivalent refactoring/migration structure. Visual check remains outstanding. |
| `components/Common/Logout/Logout.js` | `components/Common/Logout/Logout.jsx` | Restored original content/behavior and original style values in Tailwind. |
| `components/Common/Motion/Fade.js` | `components/Common/Motion/Fade.jsx` | Compared; retained matching logic/content and migration structure. |
| `components/Common/MousePointer/MousePointer.js` | `components/Common/MousePointer/MousePointer.jsx` | Compared; retained matching logic/content and migration structure. |
| `components/Common/Navbar/Button.js` | `components/Common/Navbar/Button.jsx` | Compared; retained equivalent refactoring/migration structure. Visual check remains outstanding. |
| `components/Common/Navbar/Dropdown.js` | `components/Common/Navbar/Dropdown.jsx` | Compared; retained matching logic/content and migration structure. |
| `components/Common/Navbar/MenuItems.js` | `components/Common/Navbar/MenuItems.jsx` | Compared; retained matching logic/content and migration structure. |
| `components/Common/Navbar/Navbar.js` | `components/Common/Navbar/Navbar.jsx` | Compared; retained equivalent refactoring/migration structure. Visual check remains outstanding. |
| `components/Common/Navbar/Navbar1.js` | `components/Common/Navbar/Navbar1.jsx` | Restored original content/behavior and original style values in Tailwind. |
| `components/Common/Particles/Particless.js` | `components/Common/Particles/Particless.jsx` | Compared; retained matching logic/content and migration structure. |
| `components/Common/ScrollToTop/ScrollToTop.js` | `components/Common/ScrollToTop/ScrollToTop.jsx` | Compared; retained matching logic/content and migration structure. |
| `components/DiscussionForum/CommunityGuidelines.js` | `components/DiscussionForum/CommunityGuidelines.jsx` | Restored original content/behavior and original style values in Tailwind. |
| `components/DiscussionForum/CreateComment.js` | `components/DiscussionForum/CreateComment.jsx` | Restored original content/behavior and original style values in Tailwind. |
| `components/DiscussionForum/CreateDiscussion.js` | `components/DiscussionForum/CreateDiscussion.jsx` | Restored original content/behavior and original style values in Tailwind. |
| `components/DiscussionForum/DiscussionCard.js` | `components/DiscussionForum/DiscussionCard.jsx` | Restored original content/behavior and original style values in Tailwind. |
| `components/DiscussionForum/DiscussionComment.js` | `components/DiscussionForum/DiscussionComment.jsx` | Removed extra debug output; retained migration and accessibility fixes. |
| `components/DiscussionForum/DiscussionComment2.js` | `components/DiscussionForum/DiscussionComment2.jsx` | Compared; retained equivalent refactoring/migration structure. Visual check remains outstanding. |
| `components/DiscussionForum/DiscussionPage.js` | `components/DiscussionForum/DiscussionPage.jsx` | Restored original content/behavior and original style values in Tailwind. |
| `components/DiscussionForum/ForumPage.js` | `components/DiscussionForum/ForumPage.jsx` | Restored original content/behavior and original style values in Tailwind. |
| `components/DiscussionForum/Header.js` | `components/DiscussionForum/Header.jsx` | Restored original content/behavior and original style values in Tailwind. |
| `components/DiscussionForum/HeaderDiscussion.js` | `components/DiscussionForum/HeaderDiscussion.jsx` | Restored original content/behavior and original style values in Tailwind. |
| `components/Events/Events/EventsCard.js` | `components/Events/Events/EventsCard.jsx` | Compared; retained equivalent refactoring/migration structure. Visual check remains outstanding. |
| `components/Events/Events/EventsList.js` | `components/Events/Events/EventsList.jsx` | Compared; retained matching logic/content and migration structure. |
| `components/Events/Events/EventsStatic.js` | `components/Events/Events/EventsStatic.jsx` | Compared; retained matching logic/content and migration structure. |
| `components/Events/EventsPage.js` | `components/Events/EventsPage.jsx` | Compared; retained matching logic/content and migration structure. |
| `components/Events/Header/Header.js` | `components/Events/Header/Header.jsx` | Compared; retained matching logic/content and migration structure. |
| `components/Events/Individual_Events/KDSH2022_bundle/Header.js` | `components/Events/Individual_Events/KDSH2022_bundle/Header.jsx` | Restored original content/behavior and original style values in Tailwind. |
| `components/Events/Individual_Events/KDSH2022_bundle/KDSH2022.js` | `components/Events/Individual_Events/KDSH2022_bundle/KDSH2022.jsx` | Restored a missing text separator; prior Tailwind syntax corrections retained. |
| `components/Events/Individual_Events/KDSH2022_bundle/PastHackathons.js` | `components/Events/Individual_Events/KDSH2022_bundle/PastHackathons.jsx` | Compared; retained matching logic/content and migration structure. |
| `components/Events/Individual_Events/KDSH2022_bundle/TestiMonialsDetails.js` | `components/Events/Individual_Events/KDSH2022_bundle/TestimonialsDetails.jsx` | Compared; retained matching logic/content and migration structure. |
| `components/Events/Individual_Events/KDSH2022_bundle/Testimonials.js` | `components/Events/Individual_Events/KDSH2022_bundle/Testimonials.jsx` | Compared; retained matching logic/content and migration structure. |
| `components/GalleryPage/GalleyPage.js` | `components/GalleryPage/GalleyPage.jsx` | Compared; retained matching logic/content and migration structure. |
| `components/GalleryPage/Header/Header.js` | `components/GalleryPage/Header/Header.jsx` | Compared; retained equivalent refactoring/migration structure. Visual check remains outstanding. |
| `components/GalleryPage/ImageGrid/ImageGrid.js` | `components/GalleryPage/ImageGrid/ImageGrid.jsx` | Compared; retained equivalent refactoring/migration structure. Visual check remains outstanding. |
| `components/Landing/Contact/Contact.js` | `components/Landing/Contact/Contact.jsx` | Restored original content/behavior and original style values in Tailwind. |
| `components/Landing/Contact/ContactCard.js` | `components/Landing/Contact/ContactCard.jsx` | Restored original content/behavior and original style values in Tailwind. |
| `components/Landing/Content/Content.js` | `components/Landing/Content/Content.jsx` | Restored stretch alignment; existing text/helper components retained. |
| `components/Landing/KDSH2026/SponsorsSection.js` | `components/Landing/KDSH2026/SponsorsSection.jsx` | Compared; retained equivalent refactoring/migration structure. Visual check remains outstanding. |
| `components/Landing/KdshSection/KdshSection.js` | `components/Landing/KdshSection/KdshSection.jsx` | Compared; retained matching logic/content and migration structure. |
| `components/Landing/LandingPage.js` | `components/Landing/LandingPage.jsx` | Compared; retained equivalent refactoring/migration structure. Visual check remains outstanding. |
| `components/Landing/Message.js` | `components/Landing/Message.jsx` | Restored canonical registration destination. |
| `components/Landing/Video/VideoJS.js` | `components/Landing/Video/VideoJS.jsx` | Compared; retained matching logic/content and migration structure. |
| `components/ManageTeam/ManageTeam.js` | `components/ManageTeam/ManageTeam.jsx` | Restored original content/behavior and original style values in Tailwind. |
| `components/ManageTeam/ManageTeam2.js` | `components/ManageTeam/ManageTeam2.jsx` | Compared; retained matching logic/content and migration structure. |
| `components/NotFound/NotFound.js` | `components/NotFound/NotFound.jsx` | Compared; retained equivalent refactoring/migration structure. Visual check remains outstanding. |
| `components/Privacy Policies/PrivacyPolicy.js` | `components/Privacy Policies/PrivacyPolicy.jsx` | Restored original content/behavior and original style values in Tailwind. |
| `components/RegisterPage/RegisterFormCard.js` | `components/RegisterPage/RegisterFormCard.jsx` | Restored optional GitHub field, retaining Tailwind. |
| `components/RegisterPage/RegisterPage.js` | `components/RegisterPage/RegisterPage.jsx` | Restored original content/behavior and original style values in Tailwind. |
| `components/RegisterPage/Star.js` | `components/RegisterPage/Star.jsx` | Restored original content/behavior and original style values in Tailwind. |
| `components/RegisterPage/Success.js` | `components/RegisterPage/Success.jsx` | Restored original content/behavior and original style values in Tailwind. |
| `components/RegisterPage/useFormStates.js` | `components/RegisterPage/useFormStates.js` | Restored optional GitHub validation. |
| `components/Resources/Header/Header.js` | `components/Resources/Header/Header.jsx` | Restored original content/behavior and original style values in Tailwind. |
| `components/Resources/Resources/ResourcesCard.js` | `components/Resources/Resources/ResourcesCard.jsx` | Restored original content/behavior and original style values in Tailwind. |
| `components/Resources/Resources/ResourcesList.js` | `components/Resources/Resources/ResourcesList.jsx` | Restored original content/behavior and original style values in Tailwind. |
| `components/Resources/Resources/ResourcesStatic.js` | `components/Resources/Resources/ResourcesStatic.jsx` | Compared; retained matching logic/content and migration structure. |
| `components/Resources/ResourcesPage.js` | `components/Resources/ResourcesPage.jsx` | Compared; retained matching logic/content and migration structure. |
| `components/Resources_New/CourseApp.js` | `components/Resources_New/CourseApp.jsx` | Restored original content/behavior and original style values in Tailwind. |
| `components/Resources_New/DocxLoader.js` | `components/Resources_New/DocxLoader.jsx` | Compared; retained equivalent refactoring/migration structure. Visual check remains outstanding. |
| `components/Resources_New/Header/Header.js` | `components/Resources_New/Header/Header.jsx` | Restored original content/behavior and original style values in Tailwind. |
| `components/Resources_New/LoginPrompt.js` | `components/Resources_New/LoginPrompt.jsx` | Restored original content/behavior and original style values in Tailwind. |
| `components/Resources_New/ProgressCard.js` | `components/Resources_New/ProgressCard.jsx` | Restored original content/behavior and original style values in Tailwind. |
| `components/Resources_New/course.js` | `components/Resources_New/Course.jsx` | Compared; retained matching logic/content and migration structure. |
| `components/Resources_New/course.json` | `components/Resources_New/course.json` | Compared; retained matching logic/content and migration structure. |
| `components/Resources_New/sheet.js` | `components/Resources_New/Sheet.jsx` | Restored original content/behavior and original style values in Tailwind. |
| `components/TeamPage/AdvisorsStatic.js` | `components/TeamPage/AdvisorsStatic.jsx` | Updated branch version retained at user request; earlier migration fixes preserved. |
| `components/TeamPage/AlumniMembersStatic.js` | `components/TeamPage/AlumniMembersStatic.jsx` | Updated branch version retained at user request; earlier migration fixes preserved. |
| `components/TeamPage/Header.js` | `components/TeamPage/Header.jsx` | Updated branch version retained at user request; earlier migration fixes preserved. |
| `components/TeamPage/MembersStatic.js` | `components/TeamPage/MembersStatic.jsx` | Updated branch version retained at user request; earlier migration fixes preserved. |
| `components/TeamPage/Senior-AdvisorsStatic.js` | `components/TeamPage/Senior-AdvisorsStatic.jsx` | Updated branch version retained at user request; earlier migration fixes preserved. |
| `components/TeamPage/SeniorMembersStatic.js` | `components/TeamPage/SeniorMembersStatic.jsx` | Updated branch version retained at user request; earlier migration fixes preserved. |
| `components/TeamPage/TeamCard.js` | `components/TeamPage/TeamCard.jsx` | Updated branch version retained at user request; earlier migration fixes preserved. |
| `components/TeamPage/TeamCardSM.js` | `components/TeamPage/TeamCardSM.jsx` | Updated branch version retained at user request; earlier migration fixes preserved. |
| `components/TeamPage/TeamPage.js` | `components/TeamPage/TeamPage.jsx` | Updated branch version retained at user request; earlier migration fixes preserved. |
| `components/TeamPage/TeamPageHeading.js` | `components/TeamPage/TeamPageHeading.jsx` | Updated branch version retained at user request; earlier migration fixes preserved. |
| `components/UserPages/EditProfile.js` | `components/UserPages/EditProfile.jsx` | Compared; retained matching logic/content and migration structure. |
| `components/UserPages/UserProfilePublic.js` | `components/UserPages/UserProfilePublic.jsx` | Compared; retained matching logic/content and migration structure. |
| `components/UserPages/UserProfileSelf.js` | `components/UserPages/UserProfileSelf.jsx` | Compared; retained matching logic/content and migration structure. |
| `components/WinterWorkshop/CategoryTab.js` | `components/WinterWorkshop/CategoryTab.jsx` | Compared; retained matching logic/content and migration structure. |
| `components/WinterWorkshop/CategoryTabs.js` | `components/WinterWorkshop/CategoryTabs.jsx` | Compared; retained equivalent refactoring/migration structure. Visual check remains outstanding. |
| `components/WinterWorkshop/DayTabs.js` | `components/WinterWorkshop/DayTabs.jsx` | Compared; retained matching logic/content and migration structure. |
| `components/WinterWorkshop/Header.js` | `components/WinterWorkshop/Header.jsx` | Compared; retained equivalent refactoring/migration structure. Visual check remains outstanding. |
| `components/WinterWorkshop/Projects.js` | `components/WinterWorkshop/Projects.jsx` | Compared; retained equivalent refactoring/migration structure. Visual check remains outstanding. |
| `components/WinterWorkshop/Resources.js` | `components/WinterWorkshop/Resources.jsx` | Compared; retained equivalent refactoring/migration structure. Visual check remains outstanding. |
| `components/WinterWorkshop/ResourcesCard.js` | `components/WinterWorkshop/ResourcesCard.jsx` | Compared; retained equivalent refactoring/migration structure. Visual check remains outstanding. |
| `components/WinterWorkshop/TabHeading.js` | `components/WinterWorkshop/TabHeading.jsx` | Compared; retained equivalent refactoring/migration structure. Visual check remains outstanding. |
| `components/WinterWorkshop/Tasks.js` | `components/WinterWorkshop/Tasks.jsx` | Compared; retained equivalent refactoring/migration structure. Visual check remains outstanding. |
| `components/WinterWorkshop/Topic.js` | `components/WinterWorkshop/Topic.jsx` | Compared; retained equivalent refactoring/migration structure. Visual check remains outstanding. |
| `components/WinterWorkshop/WinterWorkshop.js` | `components/WinterWorkshop/WinterWorkshop.jsx` | Compared; retained equivalent refactoring/migration structure. Visual check remains outstanding. |
| `components/WinterWorkshop/data.js` | `components/WinterWorkshop/data.js` | Compared; retained matching logic/content and migration structure. |
| `context/AuthContext.js` | `context/AuthContext.jsx` | Compared; retained matching logic/content and migration structure. |
| `index.js` | `index.jsx` | React 18 createRoot and Vite JSX entry retained. |
| `reportWebVitals.js` | `reportWebVitals.js` | Compared; retained matching logic/content and migration structure. |
| `setupTests.js` | `setupTests.js` | Compared; retained matching logic/content and migration structure. |

## Original stylesheet inventory

The `.jsx` entries contain the migration equivalents; global/library CSS remains where needed. This inventory records correspondence, not a claim of screenshot parity.

| Original stylesheet | Migration location |
| --- | --- |
| `App.css` | `src/App.css` (unchanged) |
| `components/AlumniPage/AlumniPage.css` | `src/components/AlumniPage/AlumniPage.jsx` |
| `components/AlumniPage/AlumniPageHeading.css` | `src/components/AlumniPage/AlumniPageHeader.jsx` |
| `components/AlumniPage/Header.css` | `src/components/AlumniPage/Header.jsx` |
| `components/AlumniPage/TeamCardAlumni.css` | `src/components/AlumniPage/TeamCardAlumni.jsx` |
| `components/AuthenticationPages/AuthPage.css` | `src/components/AuthenticationPages/AuthPage.jsx` |
| `components/Blog/BlogPage.css` | `src/components/Blog/BlogPage.jsx` |
| `components/Blog/Blogs/BlogCard.css` | `src/components/Blog/Blogs/BlogCard.jsx` |
| `components/Blog/Blogs/BlogList.css` | `src/components/Blog/Blogs/BlogList.jsx` |
| `components/Blog/Header/Header.css` | `src/components/Blog/Header/Header.jsx` |
| `components/CertificateGeneration/CertificateGeneration.css` | `src/components/CertificateGeneration/CertificateGeneration.jsx` |
| `components/CertificateGeneration/CertificateGenerationDiscard.css` | Styles distributed across associated JSX components; no browser verification |
| `components/CertificateGeneration/CertificateStarGuide.css` | `src/components/CertificateGeneration/CertificateStarGuide.jsx` |
| `components/CertificateGeneration/Header/Header.css` | `src/components/CertificateGeneration/Header/Header.jsx` |
| `components/Common/Footer/Footer.css` | `src/components/Common/Footer/Footer.jsx` |
| `components/Common/Logout/Logout.css` | `src/components/Common/Logout/Logout.jsx` |
| `components/Common/MousePointer/MousePointer.css` | `src/components/Common/MousePointer/MousePointer.jsx` |
| `components/Common/Navbar/Button.css` | `src/components/Common/Navbar/Button.jsx` |
| `components/Common/Navbar/Dropdown.css` | `src/components/Common/Navbar/Dropdown.jsx` |
| `components/Common/Navbar/Navbar.css` | `src/components/Common/Navbar/Navbar.jsx` |
| `components/Common/Navbar/Navbar1.css` | `src/components/Common/Navbar/Navbar1.jsx` |
| `components/DiscussionForum/CommunityGuidelines.css` | `src/components/DiscussionForum/CommunityGuidelines.jsx` |
| `components/DiscussionForum/CreateComment.css` | `src/components/DiscussionForum/CreateComment.jsx` |
| `components/DiscussionForum/CreateDiscussion.css` | `src/components/DiscussionForum/CreateDiscussion.jsx` |
| `components/DiscussionForum/DiscussionCard.css` | `src/components/DiscussionForum/DiscussionCard.jsx` |
| `components/DiscussionForum/DiscussionComment.css` | `src/components/DiscussionForum/DiscussionComment.jsx` |
| `components/DiscussionForum/DiscussionPage.css` | `src/components/DiscussionForum/DiscussionPage.jsx` |
| `components/DiscussionForum/ForumPage.css` | `src/components/DiscussionForum/ForumPage.jsx` |
| `components/DiscussionForum/Header.css` | `src/components/DiscussionForum/Header.jsx` |
| `components/DiscussionForum/HeaderDiscussion.css` | `src/components/DiscussionForum/HeaderDiscussion.jsx` |
| `components/Events/Events/EventsCard.css` | `src/components/Events/Events/EventsCard.jsx` |
| `components/Events/Events/EventsList.css` | `src/components/Events/Events/EventsList.jsx` |
| `components/Events/EventsPage.css` | `src/components/Events/EventsPage.jsx` |
| `components/Events/Header/Header.css` | `src/components/Events/Header/Header.jsx` |
| `components/Events/Individual_Events/KDSH2022_bundle/Header.css` | `src/components/Events/Individual_Events/KDSH2022_bundle/Header.jsx` |
| `components/Events/Individual_Events/KDSH2022_bundle/KDSH2022.css` | `src/components/Events/Individual_Events/KDSH2022_bundle/KDSH2022.jsx` |
| `components/Events/Individual_Events/KDSH2022_bundle/PastHackathons.css` | `src/components/Events/Individual_Events/KDSH2022_bundle/PastHackathons.jsx` |
| `components/GalleryPage/Carousel/css/embla.css` | `src/components/GalleryPage/Carousel/css/embla.css` (unchanged) |
| `components/GalleryPage/Header/Header.css` | `src/components/GalleryPage/Header/Header.jsx` |
| `components/GalleryPage/ImageGrid/ImageGrid.css` | `src/components/GalleryPage/ImageGrid/ImageGrid.jsx` |
| `components/Landing/Contact/Contact.css` | `src/components/Landing/Contact/Contact.jsx` |
| `components/Landing/Contact/ContactCard.css` | `src/components/Landing/Contact/ContactCard.jsx` |
| `components/Landing/Content/Content.css` | `src/components/Landing/Content/Content.jsx` |
| `components/Landing/KDSH2026/SponsorsSection.css` | `src/components/Landing/KDSH2026/SponsorsSection.jsx` |
| `components/Landing/KdshSection/KdshSection.css` | `src/components/Landing/KdshSection/KdshSection.jsx` |
| `components/Landing/LandingPage.css` | `src/components/Landing/LandingPage.jsx` |
| `components/Landing/Message.css` | `src/components/Landing/Message.jsx` |
| `components/Landing/SponsorSlider.css` | `src/components/Landing/SponsorSlider.jsx` |
| `components/ManageTeam/ManageTeam.css` | `src/components/ManageTeam/ManageTeam.jsx` |
| `components/ManageTeam/ManageTeam2.css` | `src/components/ManageTeam/ManageTeam2.jsx` |
| `components/NotFound/NotFound.css` | `src/components/NotFound/NotFound.jsx` |
| `components/Privacy Policies/PrivacyPolicy.css` | `src/components/Privacy Policies/PrivacyPolicy.jsx` |
| `components/RegisterPage/RegisterPage.css` | `src/components/RegisterPage/RegisterPage.jsx` |
| `components/RegisterPage/Star.css` | `src/components/RegisterPage/Star.jsx` |
| `components/RegisterPage/Success.css` | `src/components/RegisterPage/Success.jsx` |
| `components/Resources/Header/Header.css` | `src/components/Resources/Header/Header.jsx` |
| `components/Resources/Resources/ResourcesCard.css` | `src/components/Resources/Resources/ResourcesCard.jsx` |
| `components/Resources/Resources/ResourcesList.css` | `src/components/Resources/Resources/ResourcesList.jsx` |
| `components/Resources/ResourcesPage.css` | `src/components/Resources/ResourcesPage.jsx` |
| `components/Resources_New/Header/Header.css` | `src/components/Resources_New/Header/Header.jsx` |
| `components/Resources_New/LoginPrompt.css` | `src/components/Resources_New/LoginPrompt.jsx` |
| `components/Resources_New/ProgressCard.css` | `src/components/Resources_New/ProgressCard.jsx` |
| `components/Resources_New/course.css` | Styles distributed across associated JSX components; no browser verification |
| `components/TeamPage/Header.css` | `src/components/TeamPage/Header.jsx` |
| `components/TeamPage/TeamCard.css` | `src/components/TeamPage/TeamCard.jsx` |
| `components/TeamPage/TeamCardSM.css` | `src/components/TeamPage/TeamCardSM.jsx` |
| `components/TeamPage/TeamPage.css` | `src/components/TeamPage/TeamPage.jsx` |
| `components/TeamPage/TeamPageHeading.css` | `src/components/TeamPage/TeamPageHeading.jsx` |
| `components/UserPages/EditProfile.css` | `src/components/UserPages/EditProfile.jsx` |
| `components/UserPages/UserProfilePublic.css` | `src/components/UserPages/UserProfilePublic.jsx` |
| `components/UserPages/UserProfileSelf.css` | `src/components/UserPages/UserProfileSelf.jsx` |
| `components/WinterWorkshop/Header.css` | `src/components/WinterWorkshop/Header.jsx` |
| `components/WinterWorkshop/Resources.css` | `src/components/WinterWorkshop/Resources.jsx` |
| `components/WinterWorkshop/TabHeading.css` | `src/components/WinterWorkshop/TabHeading.jsx` |
| `components/WinterWorkshop/Topic.css` | `src/components/WinterWorkshop/Topic.jsx` |
| `components/WinterWorkshop/WinterWorkshop.css` | `src/components/WinterWorkshop/WinterWorkshop.jsx` |
| `index.css` | `src/index.css` / associated JSX styles |
| `index1.css` | `src/index1.css` (unchanged) |
