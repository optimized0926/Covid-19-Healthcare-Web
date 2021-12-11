import * as ImageManipulator from "expo-image-manipulator";
// import Settings from '../constants/Settings';

function shrinkImageAsync(uri) {
  return ImageManipulator.manipulateAsync(
    uri,
    [],
    {
      compress: 0.5,
    },
  );
}
export default shrinkImageAsync;
