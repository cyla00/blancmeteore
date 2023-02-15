import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

//routes
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
import ProfileNotFound from '../views/ProfileNotFound.vue'

const routes = [
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
    meta: {
      private: false
    }
  },
  {
    path: '/not-found',
    name: 'ProfileNotFound',
    component: ProfileNotFound,
    meta: {
      private: false
    }
  },
  {
    path: '/',
    name: 'Home',
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
      private: false,
	  type: 'public'
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes
})


const auth = {
	headers: {
		Authorization: `Bearer ${localStorage.getItem('token')}`
	}
}

router.beforeEach(async (to:any, from:any, next:any) => {
    const decoded = await jwt_decode(localStorage.getItem('token'))
    if(to.path === '/login' || to.path === '/registration'){
        if(!localStorage.getItem('token')){
            return next()
        }
        if(decoded.role === 'admin') return next('/admin-dash')
        if(decoded.role === 'commercial') return next('/commercial-dash')
        if(decoded.role === 'creator') return next('/creator-dash')
        if(decoded.role === 'user') return next('/user-dash')
    }

	if(!to.meta.private && to.meta.type !== 'public') return next()

  	if(to.meta.private){
    	await axios.post('http://localhost:3000/api/jwt-check', {}, auth).then(async (res:any) => {
        
            if(to.name === 'AdminDash'){
                if(decoded.role === 'admin') return next()
                localStorage.clear()
                return window.location.href = '/login'
            }

            if(to.name === 'CommercialDash'){
                if(decoded.role === 'commercial') return next()
                localStorage.clear()
                return window.location.href = '/login'
            }

            if(to.name === 'CreatorDash'){
                if(decoded.role === 'creator') return next()
                localStorage.clear()
                return window.location.href = '/login'
            }

            if(to.name === 'UserDash'){
                if(decoded.role === 'user') return next()
                localStorage.clear()
                return window.location.href = '/login'
            }

    	}).catch((err:any) => {
            console.log(err)
      		localStorage.clear()
      		return next({ name: 'Login' })
    	})
  	}

	if(to.meta.type === 'public'){
    	await axios.post('http://localhost:3000/api/public-profile', {}, {}).then((res:any) => {
			return next()
		}).catch((err:any) => {
			localStorage.clear()
			return next({ name: 'ProfileNotFound' })
		})
  	}
})

export default router
