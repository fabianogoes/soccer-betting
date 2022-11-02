
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: '/teams',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'teams', component: () => import('pages/TeamsPage.vue') }
    ]
  },
  {
    path: '/matches',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'matches', component: () => import('pages/MatchesPage.vue') }
    ]
  },
  {
    path: '/bet',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'bet', component: () => import('pages/BetPage.vue') }
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'admin', component: () => import('pages/AdminPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
