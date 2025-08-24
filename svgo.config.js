export default {
  multipass: true,
  plugins: [
    "preset-default",
    { name: "removeViewBox", active: false }, // viewBox 유지 (반응형)
    { name: "removeDimensions", active: false }, // width/height 유지
    { name: "convertStyleToAttrs", active: true },
  ],
};
