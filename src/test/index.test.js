import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'
import { TESTING_MATCHES } from './turns.constants';

const html = fs.readFileSync(path.resolve(__dirname, '../src/index.html'), 'utf8');
const jsScript = fs.readFileSync(path.resolve(__dirname, '../src/index.js'), 'utf8');

let dom
let container

describe('index.html', () => {
    beforeEach(() => {
        dom = new JSDOM(html, { runScripts: 'dangerously'})
        container = dom.window.document.body
        const scriptEl = dom.window.document.createElement("script");
        scriptEl.textContent = jsScript;
        dom.window.document.body.appendChild(scriptEl);
    });

    it('board is visible on load', function() {
        const tiles = container.getElementsByClassName('tile');

        expect(container.querySelector('#table-section')).toBeTruthy();
        expect(tiles.length).toEqual(9); // Ajustado para un tablero de 3x3
        for(let element of tiles) {
            expect(element.innerHTML).toEqual("");
        }
    });

    it('welcome message visible on load', function() {
        expect(container.querySelector('#status').innerHTML).toEqual('Game in progress...');
    });

    it('restart button section hidden on load', function() {
        expect(container.querySelector('#restart-btn').style.display).toEqual('none');
    });

    it('player 1 is active on load', function() {
        expect(container.querySelector('#player1').classList).toContain('active');
    });

    it('player 2 is inactive on load', function() {
        expect(container.querySelector('#player2').classList).not.toContain('active');
    });

    // Otras pruebas deben ajustarse similarmente
});
