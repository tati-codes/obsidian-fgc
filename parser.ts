import { noad } from "main";

//parser2
let number_pattern = new RegExp(/\d/);
let buttons = new RegExp(/((?:[MHLmhl]|[KPkp]{1})(?:[KPkp]{1}))/);
let weights = new RegExp(/[MHLmhl]/);

const get_blocks = (text: string) => block_pattern.exec(text)

export const findButtons = (text: string) => {
  
}

export const extract_text = (text: string) => {
  if (contains_block(text)){ 
    let matches = get_blocks(text) || [];
    if (matches.length > 1) return matches[2]
  } else return null
}

export const extract_buttons = (text: string) => text.split(buttons)

export const weigh_button = (text: string) => {
  if (text.includes("L")) return "light"
  else if (text.includes("M")) return "medium"
  else if (text.includes("H")) return "heavy"
  else return "none"
}


let block_pattern = new RegExp(/(!!){1}(.*?)(!!){1}/);
const contains_block = (text: string) => block_pattern.test(text)

const conver_element = (element) => {
  let text = get_blocks(element.wholeText);
  let extracted = extract_text(text);
  let buttoned = extracted?.split(buttons);
  let span = element.parentElement?.createSpan()
  span.className = "fgc"
  for (let but of buttoned) {
      but = but.replace(5, "")
      but = but.replace(/(dash)/i, " f ")
      but = but.replace("DRC", " dff ")
      but = but.replace("DR", " dff ")
      but = but.replace("66", " f ")
      if (buttons.test(but.toUpperCase)) {
        if (weights.test(but)) {
          let currentWeight = weigh_button(but)
          let innerButton = but.replace(weights, "")
          let innerSpan = span.createSpan()
          innerSpan.textContent += innerButton
          innerSpan.className += currentWeight
          span.appendChild(innerSpan)
        } else {
          span?.appendChild(span.createSpan({text: but}))
        }
        continue
      }
      span?.appendChild(span.createSpan({text:but}))
    }
    element.replaceWith(span)
    return element
}

export const walkreader = (nods: Element[]) => {
  nods.forEach(element => {
    if (element.nodeName === "#text" && block_pattern.test(element.wholeText)) {
      return conver_element(element)
  }})
}

// we gotta replace the !! !! with <span class="fgc">$block</span>
// LP -> <span class="light">P</span>
// MP -> <span class="medium">P</span>
// HP -> <span class="heavy">P</span>
// same with kicks
// KK -> K
// PP -> P

//   const codeblocks = element.findAll("code");
//   console.log("lol")
//   for (let codeblock of codeblocks) {
//     const text = codeblock.innerText.trim();
//     if (text[0] === ":" && text[text.length - 1] === ":") {
//       const emojiEl = codeblock.createSpan({
//         text: ALL_EMOJIS[text] ?? text,
//       });
//       codeblock.replaceWith(emojiEl);
//     }
//   }
// });