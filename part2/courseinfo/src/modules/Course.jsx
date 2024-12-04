import React from 'react';
import Course from './components/Course';

const Courses = () => (
    <div>Courses Module</div>
);

export default {
    routeProps: {
        path: '/courses',
        component: Course
    },
    name: 'Courses',
}