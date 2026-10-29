import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "../components/Common/Navbar/Navbar.jsx";
// Site-wide rules that used to come from the landing CSS; must stay at this
// position so the cascade order for every other page is unchanged.
import "../legacy-globals.css";
import ScrollToTop from "../components/Common/ScrollToTop/ScrollToTop.jsx";
import Footer from "../components/Common/Footer/Footer.jsx";
import Logout from "../components/Common/Logout/Logout.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";

const KDSH2022 = lazy(() => import("../components/Events/Individual_Events/KDSH2022_bundle/KDSH2022.jsx"));
const LandingPage = lazy(() => import("../components/Landing/LandingPage.jsx"));
const BlogPage = lazy(() => import("../components/Blog/BlogPage"));
const ResourcesPage = lazy(() => import("../components/Resources/ResourcesPage"));
const EventsPage = lazy(() => import("../components/Events/EventsPage"));
const TeamPage = lazy(() => import("../components/TeamPage/TeamPage.jsx"));
const WinterWorkshop = lazy(() => import("../components/WinterWorkshop/WinterWorkshop.jsx"));
const CertificateGeneration = lazy(() => import("../components/CertificateGeneration/CertificateGeneration"));
const ForumPage = lazy(() => import("../components/DiscussionForum/ForumPage.jsx"));
const DiscussionPage = lazy(() => import("../components/DiscussionForum/DiscussionPage.jsx"));
const AuthPage = lazy(() => import("../components/AuthenticationPages/AuthPage.jsx"));
const CreateDiscussion = lazy(() => import("../components/DiscussionForum/CreateDiscussion.jsx"));
const UserProfileSelf = lazy(() => import("../components/UserPages/UserProfileSelf.jsx"));
const UserProfilePublic = lazy(() => import("../components/UserPages/UserProfilePublic.jsx"));
const EditProfile = lazy(() => import("../components/UserPages/EditProfile.jsx"));
const CreateComment = lazy(() => import("../components/DiscussionForum/CreateComment.jsx"));
const ImageGrid = lazy(() => import("../components/GalleryPage/ImageGrid/ImageGrid.jsx"));
const GalleryPage = lazy(() => import("../components/GalleryPage/GalleyPage.jsx"));
const GoogleCallback = lazy(() => import("../components/AuthenticationPages/GoogleCallback.jsx"));
const CommunityGuidelines = lazy(() => import("../components/DiscussionForum/CommunityGuidelines.jsx"));
const PrivacyPolicy = lazy(() => import("../components/Privacy Policies/PrivacyPolicy.jsx"));
const RegisterPage = lazy(() => import("../components/RegisterPage/RegisterPage.jsx"));
const Success = lazy(() => import("../components/RegisterPage/Success.jsx"));
const Course = lazy(() => import("../components/Resources_New/Course.jsx"));
const Register = lazy(() => import("../components/AuthenticationPages/Register.jsx"));
const ManageTeam = lazy(() => import("../components/ManageTeam/ManageTeam.jsx"));
const NotFound = lazy(() => import("../components/NotFound/NotFound.jsx"));
const AlumniPage = lazy(() => import("../components/AlumniPage/AlumniPage.jsx"));

const AppRouter = () => {
	return (
		<React.StrictMode>
			<Router>
				<AuthProvider>
					{/* <MousePointer /> */}
					<Navbar />
					<Logout />
					<ScrollToTop>
						<Suspense fallback={<div role="status" className="min-h-screen flex items-center justify-center text-white">Loading page…</div>}>
							<Switch>
								<Route exact path="/">
									<LandingPage />
								</Route>
								<Route path="/KDSH2022">
									<KDSH2022 />
								</Route>
								<Route path="/blogs">
									<BlogPage />
								</Route>
								<Route path="/resources">
									<ResourcesPage />
								</Route>
								<Route path="/ml_sheet">
									<Course />
								</Route>
								<Route path="/events">
									<EventsPage />
								</Route>
								<Route path="/gallery">
									<GalleryPage />
								</Route>
								<Route path="/team">
									<TeamPage />
								</Route>
								<Route path="/auth">
									<AuthPage />
								</Route>
								<Route path="/google-auth/callback">
									<GoogleCallback />
								</Route>
								<Route path={`/register`}>
									<Register />
								</Route>
								<Route path="/alumni">
									<AlumniPage />
								</Route>
								<Route path="/forum">
									<ForumPage />
								</Route>
								<Route path="/edit_profile/:user_id">
									<EditProfile />
								</Route>
								<Route path="/create_discussion">
									<CreateDiscussion />
								</Route>
								<Route path="/create_comment/:post_id/:currLevel">
									<CreateComment />
								</Route>
								<Route path="/user_profile_self/:user_id">
									<UserProfileSelf />
								</Route>
								<Route path="/user_profile_public/:user_id">
									<UserProfilePublic />
								</Route>
								<Route path="/discussion_page/:post_id/:numReplies">
									<DiscussionPage />
								</Route>
								<Route path="/events-gallery/:eventTitle">
									<ImageGrid />
								</Route>
								<Route path="/winter-workshop">
									<WinterWorkshop />
								</Route>
								<Route path="/privacy-policy">
									<PrivacyPolicy />
								</Route>
								<Route path="/certificate">
									<CertificateGeneration />
								</Route>
								<Route path="/community-guidelines">
									<CommunityGuidelines />
								</Route>
								<Route path={["/register-kdsh", "/register-hackathon"]}>
									<RegisterPage />
								</Route>
								<Route path="/register-success">
									<Success />
								</Route>
								<Route path="/manage-team">
									<ManageTeam />
								</Route>
								<Route path="*">
									<NotFound />
								</Route>
							</Switch>
						</Suspense>
					</ScrollToTop>
					<Footer />
				</AuthProvider>
			</Router>
		</React.StrictMode >
	);
};

export default AppRouter;
