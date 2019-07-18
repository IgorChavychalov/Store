Vue.component('search', {
    data(){
        return {
            userSearch: '',
        }
    },
    template:`<form action="#" method="post" class="search-form" @submit.prevent="$parent.$refs.products.filter(userSearch)">
            <input type="text" class="search-field" v-model="userSearch">
            <button class="btn-search" type="submit">Search
            </button>
        </form>`


});
