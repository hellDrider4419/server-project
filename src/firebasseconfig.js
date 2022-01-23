// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, onValue } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC45XVxpnRABoV8Sb0ido1UTBBwQCzM1BY",
  authDomain: "gamersbox-ee716.firebaseapp.com",
  databaseURL: "https://gamersbox-ee716-default-rtdb.firebaseio.com",
  projectId: "gamersbox-ee716",
  storageBucket: "gamersbox-ee716.appspot.com",
  messagingSenderId: "1011133247974",
  appId: "1:1011133247974:web:0c4ed6af47443c9685e627",
  measurementId: "G-B9SMBQWXQP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export let titleList = [];
export const db = getDatabase(app);
let setDataIndex = -1;
try {
  if (!titleList.length) {
    onValue(ref(db, "TitleList"), (snapshot) => {
      titleList = snapshot.val() ? snapshot.val() : 0;
    });
  }
} catch (err) {
  console.log(err);
}

export default function writeUserData(
  data,
  setUpdateData,
  setWillUpdate,
  setPostIndex,
  setAlertState,
  setbtnState,
  setAlertMsg,
  setUpdate,
  willUpdate,
  postIndex,
  wantUpdate
) {
  data["date"] = new Date().toString();
  console.log(new Date());
  let setData = true;

  let count = 0;
  console.log("functin called");

  try {
    onValue(ref(db, "listcount"), (snapshot) => {
      count = snapshot.val() ? snapshot.val() : 0;
    });
  } catch (err) {
    console.log(err);
  }
  if (titleList) {
    for (let i = 0; i < titleList.length; i++) {
      if (titleList[i].toLowerCase() === data["Post Title"].toLowerCase()) {
        setData = false;
        setPostIndex(i);
        setDataIndex = i;
        break;
      }
    }
  }
  if (willUpdate) {
    setData = false;
  }
  (async () => {
    if (setData) {
      await set(ref(db, "resolveError"), count);
      await set(ref(db, "TitleList/" + count), data["Post Title"]);
      await set(ref(db, "Posts/" + count), data);
      titleList = [...titleList, data["Post Title"]];
      data = {};
      await set(ref(db, "listcount"), count + 1);
      setAlertMsg("post data saved successfully");
      setAlertState("flex");
    } else if (willUpdate === true && postIndex > -1) {
      let update = true;
      if (titleList) {
        for (let i = 0; i < titleList.length; i++) {
          if (!(i === postIndex)) {
            if (
              titleList[i].toLowerCase() === data["Post Title"].toLowerCase()
            ) {
              setUpdateData({});
              setAlertMsg(
                'OOPs... Other post with same title exist"' +
                  data["Post Title"].toUpperCase() +
                  '" Cannot update'
              );
              setAlertState("flex");
              setUpdate(false);
              setWillUpdate(false);
              setPostIndex(-1);
              update = false;
              break;
            }
          }
        }
      }
      if (update === true) {
        await set(ref(db, "Posts/" + postIndex), data);
        await set(ref(db, "TitleList/" + postIndex), data["Post Title"]);
        titleList[postIndex] = data["Post Title"];
        data = {};
        setUpdateData({});
        setAlertMsg("post data updated successfully");
        setAlertState("flex");
        setUpdate(false);
        setWillUpdate(false);
        setPostIndex(-1);
        try {
          onValue(ref(db, "TitleList"), (snapshot) => {
            titleList = snapshot.val() ? snapshot.val() : 0;
          });
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      setbtnState("flex");
      setAlertMsg(
        "Post title already exist, press ok button if you want to update? "
      );
      setAlertState("flex");
    }
  })();
}

export function retriveData(setUpdateData, setWillUpdate) {
  onValue(ref(db, "Posts/" + setDataIndex), (e) => {
    setUpdateData(e.val());
    setWillUpdate(true);
  });
}
export let recievedData = [];
