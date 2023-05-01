import '../styles/Rules.css';
import '../styles/common.css';

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import useEscapeToGoBack from '../common/useEscapeToGoBack';

export default function Rules() {
  useEscapeToGoBack();
  const navigate = useNavigate();

  return (
    <>
      <div className="rulesContainer">
        <div>
          <div>
            <div className="rulesTitle pill">Goats</div>
            <ul className="rules">
              <li>
                Goats cannot move until all goats have been positioned on the
                board.
              </li>
              <li>They must leave the board when captured.</li>
              <li>They cannot jump over tigers or other goats.</li>
            </ul>
          </div>
          <div className="rulesTitle pill">Tigers</div>
          <ul className="rules">
            <li>They can move to an adjacent free position along the lines.</li>
            <li>
              They can capture goats during any move, and do not need to wait
              until all goats are placed.
            </li>
            <li>They can capture only one goat at a time.</li>
            <li>
              They can jump over a goat in any direction, as long as there is an
              open space for the tiger to complete its turn.
            </li>
            <li>A tiger cannot jump over another tiger.</li>
          </ul>
        </div>
        <div>
          <div className="rulesTitle pill">Game</div>
          <ul className="rules">
            Sometimes the game can fall into a repetitive cycle of positions.
            Goats especially may use this resort to defend themselves against
            being captured. To avoid this situation, an additional rule has been
            established: when all the goats have been placed, no move may return
            the board to a situation that has already occurred during the game.
          </ul>
        </div>
      </div>
      <div className="footer">
        <Link
          to={'..'}
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          className="pill"
        >
          Done
        </Link>
        <div>
          Source:
          <a href="https://en.wikipedia.org/wiki/Bagh-Chal" target="_blank">
            Wikipedia
          </a>
        </div>
      </div>
    </>
  );
}
