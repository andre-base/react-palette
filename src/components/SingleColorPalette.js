import React from 'react';
import seedColors from '../seeds/seedColors';
import { generatePalette } from '../colorHelpers';
import { useParams } from 'react-router-dom';
import ColorBox from './ColorBox';
import Header from './Header';
import Footer from './Footer';

const SingleColorPalette = () => {
  const findPalette = slug => {
    return seedColors.find(palette => {
      return palette.id === slug;
    });
  };

  let { slug, colorId } = useParams();
  const palette = generatePalette(findPalette(slug));

  const getShades = () => {
    let shades = [];
    for (let key in palette.colors) {
      shades = [
        ...shades,
        ...palette.colors[key].filter(color => color.id === colorId)
      ];
    }
    console.log(shades);

    return shades.slice(1);
  };

  const colorBoxes = getShades().map(color => (
    <ColorBox
      key={color.name.replace(/\s/g, '')}
      name={color.name}
      background={color.hex}
      showLink={false}
    />
  ));

  return (
    <div>
      <Header />
      <div className="Palette-colors">{colorBoxes}</div>
      <Footer paletteName={palette.paletteName} emoji={palette.emoji} />
    </div>
  );
};

export default SingleColorPalette;
