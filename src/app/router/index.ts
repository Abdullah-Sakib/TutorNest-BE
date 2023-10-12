import express from 'express';
import { UserRoutes } from '../modules/user/user.router';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { AdminRoutes } from '../modules/admin/admin.router';
import { AuthRoutes } from '../modules/auth/auth.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    router: UserRoutes,
  },
  {
    path: '/academic-departments',
    router: AcademicDepartmentRoutes,
  },
  {
    path: '/admin',
    router: AdminRoutes,
  },
  {
    path: '/auth',
    router: AuthRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.router));

export default router;
