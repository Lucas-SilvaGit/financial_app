import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AccountList from './components/AccountList';
import AccountForm from './components/AccountForm';
import AccountEdit from './components/AccountEdit';

import CategoryList from './components/CategoryList';
import CategoryForm from './components/CategoryForm';
import CategoryEdit from './components/CategoryEdit';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/accounts" element={<AccountList />} />
      <Route path="/accounts/create" element={<AccountForm />} />
      <Route path="/accounts/edit/:id" element={<AccountEdit />} />

      <Route path="/categories" element={<CategoryList />} />
      <Route path="/categories/create" element={<CategoryForm />} />
      <Route path="/categories/edit/:id" element={<CategoryEdit />} />
    </Routes>
  );
};

export default AppRouter;
