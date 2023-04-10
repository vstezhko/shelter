import './index.html';
import './main.scss';
import {Burger} from "./js/Burger";
import {Popup} from "./js/Popup";
import {Pagination} from "./js/Pagination";
import {Slider} from "./js/Slider";


window.onload = function(){
    Popup()
    Burger()
    Pagination()
    Slider()
}