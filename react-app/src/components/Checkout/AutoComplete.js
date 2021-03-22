export const googleAutocomplete = async text =>
  new Promise((resolve, reject) => {
    if (!text) {
      return reject("Need valid text input")
    }

    // for use in things like GatsbyJS where the html is generated first
    if (typeof window === "undefined") {
      return reject("Need valid window object")
    }

    try {
      new window.google.maps.places.AutocompleteService().getPlacePredictions(
        { input: text, componentRestrictions: { country: "usa" } },
        resolve
      )
    } catch (e) {
      reject(e)
    }
  })