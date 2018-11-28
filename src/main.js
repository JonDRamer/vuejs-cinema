import Vue from 'vue';
import './style.scss';
import genres from './util/genres';

new Vue({
    el: '#app',
    methods: {
        checkfilter(category, genre, checked) {
            console.log('Category: ', category, 'Genre: ', genre, 'Checked: ', checked);
        }
    },
    components: {
        'movie-list': {
            template: `<div id="movie-list">
                            <div v-for="movie in movies" class="movie">
                                {{ movie.title }}
                            </div>
                       </div>`,
            data() {
                return {
                    movies: [
                        { title: 'Pulp Fiction' },
                        { title: 'Home Alone' },
                        { title: 'Austin Powers' }
                    ]
                };
            }
        },
        'movie-filter': {
            data() {
                return {
                    genres
                }
            },
            template: `<div id="movie-filter">
                            <h2>Filter Results</h2>
                            <div class="filter-group">
                                <check-filter v-for="genre in genres" v-bind:genre="genre" v-on:check-filter="checkFilter"></check-filter>
                            </div>
                       </div>`,
            methods: {
                checkFilter(category, genre, checked) {
                    this.$emit('check-filter', category, genre, checked);
                    
                }
            },
            components: {
                'check-filter': {
                    data() {
                        return {
                            checked: false
                        }
                    },
                    props: [ 'genre' ],
                    template: `<div v-bind:class="{ 'check-filter': true, 'active': checked }" v-on:click="checkFilter">
                                    <span class="checkbox"></span>
                                    <span class="check-filter-title"></span>
                                    {{ genre }}
                              </div>`,
                    methods: {
                        checkFilter() {
                            this.checked = !this.checked;
                            this.$emit('check-filter', 'genre', this.genre, this.checked)
                        }
                    }
                }
            }
        }
    }
});
