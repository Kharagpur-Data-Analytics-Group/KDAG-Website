import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import KDSH2022 from "../components/Events/Individual_Events/KDSH2022_bundle/KDSH2022.jsx";
import Navbar from "../components/Common/Navbar/Navbar.jsx";
// import MousePointer from "../components/Common/MousePointer/MousePointer";
// Site-wide rules that used to come from the landing CSS; must stay at this
// position so the cascade order for every other page is unchanged.
import "../legacy-globals.css";
import LandingPage from "../components/Landing/LandingPage.jsx";
import BlogPage from "../components/Blog/BlogPage";
import ResourcesPage from "../components/Resources/ResourcesPage";
import EventsPage from "../components/Events/EventsPage";
import TeamPage from "../components/TeamPage/TeamPage.jsx";
import ScrollToTop from "../components/Common/ScrollToTop/ScrollToTop.jsx";
import Footer from "../components/Common/Footer/Footer.jsx";
import WinterWorkshop from "../components/WinterWorkshop/WinterWorkshop.jsx";
import CertificateGeneration from "../components/CertificateGeneration/CertificateGeneration";
import ForumPage from "../components/DiscussionForum/ForumPage.jsx";
import DiscussionPage from "../components/DiscussionForum/DiscussionPage.jsx";
import AuthPage from "../components/AuthenticationPages/AuthPage.jsx";
import CreateDiscussion from "../components/DiscussionForum/CreateDiscussion.jsx";
import UserProfileSelf from "../components/UserPages/UserProfileSelf.jsx";
import UserProfilePublic from "../components/UserPages/UserProfilePublic.jsx";
import EditProfile from "../components/UserPages/EditProfile.jsx";
import Logout from "../components/Common/Logout/Logout.jsx";
import CreateComment from "../components/DiscussionForum/CreateComment.jsx";
import ImageGrid from "../components/GalleryPage/ImageGrid/ImageGrid.jsx";
import GalleryPage from "../components/GalleryPage/GalleyPage.jsx";
import GoogleCallback from "../components/AuthenticationPages/GoogleCallback.jsx";
import { AuthProvider } from "../context/AuthContext.js";
import CommunityGuidelines from "../components/DiscussionForum/CommunityGuidelines.jsx";
import PrivacyPolicy from "../components/Privacy Policies/PrivacyPolicy.jsx";
import RegisterPage from "../components/RegisterPage/RegisterPage.jsx";
import Success from "../components/RegisterPage/Success.jsx";
import Course from "../components/Resources_New/course.jsx";
import Register from '../components/AuthenticationPages/Register.jsx';
import ManageTeam2 from "../components/ManageTeam/ManageTeam2.jsx";
import NotFound from "../components/NotFound/NotFound.jsx";
import AlumniPage from "../components/AlumniPage/AlumniPage.jsx";

const AppRouter = () => {
	return (
		<React.StrictMode>
			<Router>
				<AuthProvider>
					{/* <MousePointer /> */}
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
							<Route path="/register-kdsh">
								<RegisterPage />
							</Route>
							<Route path="/register-success">
								<Success />
							</Route>
							<Route path="/manage-team">
								<ManageTeam2 />
							</Route>
							<Route path="*">
								<NotFound />
							</Route>
						</Switch>
					</ScrollToTop>
					<Footer />
				</AuthProvider>
			</Router>
		</React.StrictMode >
	);
};

export default AppRouter;
