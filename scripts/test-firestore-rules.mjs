// Manual check of firestore.rules against the local Firestore emulator (needs Java).
//   1. firebase emulators:start --only firestore --project demo-formw8
//      (with "firestore": {"port": 8089} configured, or adjust `base` below)
//   2. node scripts/test-firestore-rules.mjs
// Expected: the three "expect 200" lines succeed and every "expect 403" line is rejected.
const base="http://127.0.0.1:8089/v1/projects/demo-formw8/databases/(default)/documents";
const commit=async(day,fields,n="1")=>{
  const r=await fetch(base+":commit",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({writes:[{transform:{document:`projects/demo-formw8/databases/(default)/documents/daily/${day}`,fieldTransforms:fields.map(f=>({fieldPath:f,increment:{integerValue:n}}))}}]})});
  return r.status;
};
const get=async(day)=>(await fetch(`${base}/daily/${day}`)).status;
const res={
 "create visit +1 (expect 200)":await commit("2026-10-12",["visit"]),
 "visit +1 again (expect 200)":await commit("2026-10-12",["visit"]),
 "other event +1 (expect 200)":await commit("2026-10-12",["pdf_download"]),
 "unknown event (expect 403)":await commit("2026-10-12",["hack"]),
 "increment by 5 (expect 403)":await commit("2026-10-12",["visit"],"5"),
 "two fields at once (expect 403)":await commit("2026-10-12",["visit","pdf_download"]),
 "bad day id (expect 403)":await commit("not-a-day",["visit"]),
 "new day, +5 on create (expect 403)":await commit("2026-10-13",["visit"],"5"),
 "read doc (expect 403)":await get("2026-10-12"),
};
console.log(JSON.stringify(res,null,1));
