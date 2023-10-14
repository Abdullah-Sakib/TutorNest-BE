import express from 'express';
import { UserRoutes } from '../modules/user/user.router';
import { AdminRoutes } from '../modules/admin/admin.router';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BookingRoutes } from '../modules/booking/booking.route';
import { TutorRoutes } from '../modules/tutor/tutor.route';
import { AddToCartRoutes } from '../modules/addToCart/addToCart.route';
import { NotificationRoutes } from '../modules/notification/notification.route';
import { BlogRoutes } from '../modules/blog/blog.route';
import { FAQRoutes } from '../modules/FAQ/FAQ.route';
import { FeedbackRoutes } from '../modules/feedback/feedback.route';
import { LatestNewsRoutes } from '../modules/latestNews/latestNews.route';
import { ReviewRoutes } from '../modules/review/review.route';
import { UpcomingServiceRoutes } from '../modules/upcomingService/upcomingService.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    router: UserRoutes,
  },
  {
    path: '/admin',
    router: AdminRoutes,
  },
  {
    path: '/auth',
    router: AuthRoutes,
  },
  {
    path: '/tutor',
    router: TutorRoutes,
  },
  {
    path: '/booking',
    router: BookingRoutes,
  },
  {
    path: '/add-to-cart',
    router: AddToCartRoutes,
  },
  {
    path: '/notification',
    router: NotificationRoutes,
  },
  {
    path: '/blog',
    router: BlogRoutes,
  },
  {
    path: '/faq',
    router: FAQRoutes,
  },
  {
    path: '/feedback',
    router: FeedbackRoutes,
  },
  {
    path: '/latest-news',
    router: LatestNewsRoutes,
  },
  {
    path: '/review',
    router: ReviewRoutes,
  },
  {
    path: '/upcoming-service',
    router: UpcomingServiceRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.router));

export default router;
