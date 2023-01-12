export function init() {
  //*query framework
  (function () {
    let dc = {
      query: (e) => {
        return query(document, e);
      },
      queries: (e) => {
        return queries(document, e);
      },
      id: (e) => {
        return getId(document, e);
      }
    }
    function getId(ele, trgt) {
      return querify(ele.getElementById(trgt))
    }
    function query(ele, trgt) {
      return querify(ele.querySelector(trgt))
    }
    function queries(ele, trgt) {
      return querify(ele.querySelectorAll(trgt))
    }

    function querify(ele) {
      if (!ele) return
      ele.query = (e) => query(ele, e);
      ele.queries = (e) => queries(ele, e);
      return ele
    }
    window.dc = dc;
  })()
}

//respond to visibility
function respondToVisibility(element, callback, once = false) {
  let options = {
      root: null
  }

  let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.intersectionRatio > 0) {
              callback();
              once && observer.disconnect();
          }
      });
  }, options);

  observer.observe(element);
}

//height animation
export function setHeightProperties(section) {
  section.querySelectorAll('.heightAnimation').forEach(item => {
      respondToVisibility(item, _ => {
          setHeightProperty(item);
      }, true)
  })
  const setHeightProperty = (i) => {
      i.style.setProperty('--maxHeight', i.scrollHeight + 'px');
  }
}