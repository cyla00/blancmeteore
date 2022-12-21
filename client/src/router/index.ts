import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Accompagnement from '../views/Accompagnement.vue'
import Graphique from '../views/Graphique.vue'
import Sites from '../views/Sites.vue'
import AdminDash from '../views/AdminDash.vue'
import CommercialDash from '../views/CommercialDash.vue'
import CreatorDash from '../views/CreatorDash.vue'
import UserDash from '../views/UserDash.vue'
import Login from '../views/Login.vue'
import Registration from '../views/Registration.vue'
import UserPublic from '../views/UserPublic.vue'
import NotFound from '../views/NotFound.vue'
import ConditionsVente from '../views/ConditionsVente.vue'
import PolitiqueConfidentialite from '../views/PolitiqueConfidentialite.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)',
    name: 'NotFound',
    component: NotFound,
    meta: {
      private: false
    }
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      private: false
    }
  },
  {
    path: '/accompagnement-digital',
    name: 'Accompagnement',
    component: Accompagnement,
    meta: {
      private: false
    }
  },
  {
    path: '/identite-graphique',
    name: 'Graphique',
    component: Graphique,
    meta: {
      private: false
    }
  },
  {
    path: '/sites',
    name: 'Sites',
    component: Sites,
    meta: {
      private: false
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      private: false
    }
  },
  {
    path: '/registration',
    name: 'Registration',
    component: Registration,
    meta: {
      private: false
    }
  },
  {
    path: '/politique-confidentialite',
    name: 'PolitiqueConfidentialite',
    component: PolitiqueConfidentialite,
    meta: {
      private: false
    }
  },
  {
    path: '/conditions-vente',
    name: 'ConditionsVente',
    component: ConditionsVente,
    meta: {
      private: false
    }
  },
  {
    path: '/admin-dash',
    name: 'AdminDash',
    component: AdminDash,
    meta: {
      private: true
    }
  },
  {
    path: '/commercial-dash',
    name: 'CommercialDash',
    component: CommercialDash,
    meta: {
      private: true
    }
  },
  {
    path: '/creator-dash',
    name: 'CreatorDash',
    component: CreatorDash,
    meta: {
      private: true
    }
  },
  {
    path: '/user-dash',
    name: 'UserDash',
    component: UserDash,
    meta: {
      private: true
    }
  },
  {
    path: '/user/:id',
    name: 'UserPublic',
    component: UserPublic,
    meta: {
      private: false
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
