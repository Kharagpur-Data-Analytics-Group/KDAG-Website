import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import KDSH2022 from "../components/Events/Individual_Events/KDSH2022_bundle/KDSH2022";
import Navbar from "../components/Common/Navbar/Navbar";
import MousePointer from "../components/Common/MousePointer/MousePointer";
import LandingPage from "../components/Landing/LandingPage";
import BlogPage from "../components/Blog/BlogPage";
import ResourcesPage from "../components/Resources/ResourcesPage";
import EventsPage from "../components/Events/EventsPage";
import TeamPage from "../components/TeamPage/TeamPage";
import AlumniPage from "../components/AlumniPage/AlumniPage";
import ScrollToTop from "../components/Common/ScrollToTop/ScrollToTop.js";
import Footer from "../components/Common/Footer/Footer";
import WinterWorkshop from "../components/WinterWorkshop/WinterWorkshop";
import CertificateGeneration from "../components/CertificateGeneration/CertificateGeneration";
import ForumPage from "../components/DiscussionForum/ForumPage.js";
import DiscussionPage from "../components/DiscussionForum/DiscussionPage.js";
import AuthPage from "../components/AuthenticationPages/AuthPage.js";
import CreateDiscussion from "../components/DiscussionForum/CreateDiscussion.js";
import UserProfileSelf from "../components/UserPages/UserProfileSelf.js";
import UserProfilePublic from "../components/UserPages/UserProfilePublic.js";
import EditProfile from "../components/UserPages/EditProfile.js";
import Logout from "../components/Common/Logout/Logout.js";
import CreateComment from "../components/DiscussionForum/CreateComment.js";
import GalleryPage from "../components/GalleryPage/GalleyPage.js";
import ImageGrid from "../components/GalleryPage/ImageGrid/ImageGrid.js";
import GoogleCallback from "../components/AuthenticationPages/GoogleCallback.js";
import { AuthProvider } from "../context/AuthContext.js";
import CommunityGuidelines from "../components/DiscussionForum/CommunityGuidelines.js";
import PrivacyPolicy from "../components/Privacy Policies/PrivacyPolicy.js";
import RegisterPage from "../components/RegisterPage/RegisterPage.js";
import Success from "../components/RegisterPage/Success.js";

const AppRouter = () => {
	return (
		<React.StrictMode>
			<Router>
				<AuthProvider>
					<MousePointer />
					<Navbar />
					<Logout />
					<ScrollToTop>
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
							<Route path="/events-gallery">
								<ImageGrid />
							</Route>
							<Route path="/winter-workshop">
								<WinterWorkshop />
							</Route>
							<Route path="/privacy-policy">
								<PrivacyPolicy />
							</Route>
							<Route path="/certificate-generation">
								<CertificateGeneration />
							</Route>
							<Route path="/community-guidelines">
								<CommunityGuidelines />
							</Route>
							{/* <Route path="/register-kdsh">
								<RegisterPage />
							</Route>
							<Route path="/register-success">
								<Success />
							</Route> */}
						</Switch>
					</ScrollToTop>
					<Footer />
				</AuthProvider>
			</Router>
		</React.StrictMode>
	);
};

export default AppRouter;
