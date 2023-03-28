import * as R from "ramda";
import {text} from "stream/consumers";
import {filter} from "ramda";

const stringToArray = R.split("");

/* Question 1 */
export const countLetters: (text: string) => { [key: string]: number } = (text: string) => countLettersHelper(text);

const countLettersHelper : (text: string) => {[key: string]: number} = R.pipe(
    (text: string) => R.trim(text),
    (textTrimmed: string) => stringToArray(textTrimmed),
    (textAsArray: string[]) => R.without([' '], textAsArray),
    (textAsArray: string[]) => R.countBy(R.toLower, textAsArray)
);

/* Question 2 */
const parenthesis: {[x:string]: string} = {'(': ')',')': '(','[':']',']':'[','{':'}','}':'{'};

const filterParenthesis = (array: string[]) => R.filter( (x: string) => Object.keys(parenthesis).includes(x))(array);

const checkBalance: (array: string[]) => string[] = (array: string[]) => R.reduce( (acc:string[], symbol:string) =>
        symbol === '(' || symbol === '[' || symbol === '{' ? acc.concat(symbol) :
        acc.length > 0 && parenthesis[acc[acc.length - 1]] === symbol ? R.take(acc.length - 1, acc) :
        acc.concat(symbol)
    , [], array)

export const isPaired: (text: string) => boolean = R.pipe(
    (text: string) => stringToArray(text),
    filterParenthesis,
    checkBalance,
    (array: string[]) => array.length == 0
);

/* Question 3 */
export type WordTree = {
    root: string;
    children: WordTree[];
}

export const treeToSentence : (wordTree: WordTree) => string = treeToSentenceHelper;

function treeToSentenceHelper(wordTree: WordTree): string{
    if(wordTree.children.length == 0)
        return wordTree.root;
    else{
        return wordTree.root + R.reduce((acc:string, child: WordTree) => acc + " " +  treeToSentenceHelper(child), "")(wordTree.children);
    }
}