<template>
  <router-view />
</template>

<style>
/* Fonts */
@font-face {
  font-family: "U";
  src: url("./assets/fonts/U.ttf") format("truetype");
}

/* Fonts */

html,
body {
  overflow-x: hidden;
}

body {
  margin: 0;
  height: 100vh;
  font-family: U;
  font-size: 16px;
  display: flex;
  flex-direction: column;
}

#page_content h1 {
  font-size: 40px;
  font-weight: 400;
  margin-top: 64px;
  margin-bottom: 40px;
}

#page_content h2 {
  font-size: 32px;
  font-weight: 400;
  margin-top: 80px;
}

@media (max-width: 500px) {
  #page_content h1 {
    font-size: 30px;
  }
}

#page_content {
  flex-grow: 1;
  max-width: 1360px;
  width: calc(100% - 16px);
}

.container {
  width: calc(100% - 16px);
}

h1 {
  margin: 0;
}

a {
  color: black;
  text-decoration: none;
}

p {
  margin: 0;
}

/* Common */
.flex-row {
  display: flex;
}

.cursor-pointer {
  cursor: pointer;
}

.hidden {
  opacity: 0;
  pointer-events: none;
}

@media (max-width: 800px) {
  .mobile-hide {
    display: none;
  }
}

@media (min-width: 801px) {
  .desktop-hide {
    display: none;
  }
}

.selection span.select2-selection {
  background-color: #d9d9d9;
  border-radius: 18px;
  border: none;
  display: flex;
  align-items: center;
  height: auto !important;
  padding: 8px;
}

.selection span.select2-selection b {
  position: static !important;
  border: none;
  font-size: 28px;
  font-weight: 100;
  border-width: 0 !important;
  width: 28px !important;
  height: 28px !important;
  top: 0 !important;
  left: 0 !important;
  display: flex;
  align-items: center;
}

.select2-selection__rendered {
  margin-right: 8px;
}

.selection span.select2-selection {
  position: static !important;
  display: flex;
  align-items: center;
}

.select2-selection__arrow {
  position: static !important;
}

.selection span.select2-selection b::after {
  content: "\ea6a";
  font-family: remixicon;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 95%;
  height: 100%;
}

.my_dropdown {
  right: 0;
  padding: 17px;
  border: none !important;
  background-color: #d9d9d9 !important;
}

.my_dropdown {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.5);
}

.my_dropdown .select2-results__option {
  padding: 4px 0;
}

.my_dropdown .select2-results__option.select2-results__option--highlighted {
  color: black !important;
  background: transparent !important;
}

.select2-dropdown {
  border-bottom-left-radius: 18px !important;
  border-bottom-right-radius: 18px !important;
}

.divider {
  background-color: #d9d9d9;
  width: calc(100% - 28px);
  border-left: 2px solid black;
  height: 26px;
  border-right: 2px solid black;
}

@media (max-width: 800px) {
  .divider {
    width: calc(100% - 4px);
  }
}
</style>
