import { Routes, Route, Link, Outlet } from 'react-router-dom';

function ControlUser() {
  return (
    <div class="h-auto p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
      <Outlet class="h-full" />
    </div>
  );
}

export default ControlUser;