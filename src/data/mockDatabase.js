// Fully client-side mock "database" for Insight Hub.
// No backend, no network calls — everything lives in memory and localStorage
// so the demo data persists across page reloads.

const STORAGE_KEY = "insighthub_mock_db_v2";

const seedUsers = [
  {
    id: 1,
    sapid: "10001234",
    password: "pass1234",
    name: "Ava Patel",
    email: "ava.patel@insighthub.io",
    phone_number: "+919812340001",
    designation: "Frontend Engineer",
    project_name: "Atlas Redesign",
    role: "USER",
    total_appreciation: 12,
    rank: 3,
  },
  {
    id: 2,
    sapid: "10005678",
    password: "pass1234",
    name: "Liam Chen",
    email: "liam.chen@insighthub.io",
    phone_number: "+919812340002",
    designation: "Backend Engineer",
    project_name: "Atlas Redesign",
    role: "USER",
    total_appreciation: 9,
    rank: 5,
  },
  {
    id: 3,
    sapid: "10009012",
    password: "pass1234",
    name: "Sofia Martinez",
    email: "sofia.martinez@insighthub.io",
    phone_number: "+919812340003",
    designation: "Engineering Manager",
    project_name: "Platform Core",
    role: "ADMIN",
    total_appreciation: 20,
    rank: 1,
  },
  {
    id: 4,
    sapid: "10003456",
    password: "pass1234",
    name: "Noah Williams",
    email: "noah.williams@insighthub.io",
    phone_number: "+919812340004",
    designation: "QA Engineer",
    project_name: "Nimbus Cloud",
    role: "USER",
    total_appreciation: 6,
    rank: 8,
  },
  {
    id: 5,
    sapid: "10007890",
    password: "pass1234",
    name: "Emma Johnson",
    email: "emma.johnson@insighthub.io",
    phone_number: "+919812340005",
    designation: "HR Business Partner",
    project_name: "People Ops",
    role: "ADMIN",
    total_appreciation: 15,
    rank: 2,
  },
  {
    id: 6,
    sapid: "10002345",
    password: "pass1234",
    name: "Oliver Brown",
    email: "oliver.brown@insighthub.io",
    phone_number: "+919812340006",
    designation: "DevOps Engineer",
    project_name: "Nimbus Cloud",
    role: "USER",
    total_appreciation: 11,
    rank: 4,
  },
  {
    id: 7,
    sapid: "10006789",
    password: "pass1234",
    name: "Isabella Garcia",
    email: "isabella.garcia@insighthub.io",
    phone_number: "+919812340007",
    designation: "Product Designer",
    project_name: "Atlas Redesign",
    role: "USER",
    total_appreciation: 8,
    rank: 6,
  },
  {
    id: 8,
    sapid: "10004567",
    password: "pass1234",
    name: "Ethan Davis",
    email: "ethan.davis@insighthub.io",
    phone_number: "+919812340008",
    designation: "Data Analyst",
    project_name: "Insight Analytics",
    role: "USER",
    total_appreciation: 7,
    rank: 7,
  },
];

const seedPendingRequests = [
  {
    id: 101,
    sapid: "10011223",
    name: "Maya Singh",
    email: "maya.singh@insighthub.io",
    phone_number: "+919812340101",
    designation: "Junior Developer",
    project_name: "Atlas Redesign",
    password: "reqpass1",
    creationDate: "2026-07-14T09:20:00.000Z",
  },
  {
    id: 102,
    sapid: "10022334",
    name: "Daniel Kim",
    email: "daniel.kim@insighthub.io",
    phone_number: "+919812340102",
    designation: "Site Reliability Engineer",
    project_name: "Nimbus Cloud",
    password: "reqpass2",
    creationDate: "2026-07-15T13:05:00.000Z",
  },
  {
    id: 103,
    sapid: "10033445",
    name: "Priya Nair",
    email: "priya.nair@insighthub.io",
    phone_number: "+919812340103",
    designation: "Business Analyst",
    project_name: "Insight Analytics",
    password: "reqpass3",
    creationDate: "2026-07-16T17:40:00.000Z",
  },
  {
    id: 104,
    sapid: "10044556",
    name: "Marcus Lee",
    email: "marcus.lee@insighthub.io",
    phone_number: "+919812340104",
    designation: "UX Researcher",
    project_name: "Platform Core",
    password: "reqpass4",
    creationDate: "2026-07-17T08:15:00.000Z",
  },
];

const seedPosts = [
  {
    id: 1001,
    from_sapid: "10005678",
    to_sapid: "10001234",
    getterName: "Ava Patel",
    appreciation_header: "Outstanding teamwork",
    appreciation_message:
      "Ava jumped in on the Atlas migration two days before the deadline and helped untangle a nasty state-management bug the whole team was stuck on. Could not have shipped without her.",
    likes: 24,
    creation_date: "2026-07-16T18:32:00.000Z",
  },
  {
    id: 1002,
    from_sapid: "10009012",
    to_sapid: "10007890",
    getterName: "Emma Johnson",
    appreciation_header: "Great leadership",
    appreciation_message:
      "Emma redesigned our onboarding flow so new hires ramp up in half the time. The feedback from the last three cohorts has been glowing.",
    likes: 31,
    creation_date: "2026-07-16T11:05:00.000Z",
  },
  {
    id: 1003,
    from_sapid: "10001234",
    to_sapid: "10006789",
    getterName: "Isabella Garcia",
    appreciation_header: "Innovative solution",
    appreciation_message:
      "The new component library Isabella put together cut our design-to-dev handoff time dramatically. Genuinely one of the best design systems I've worked with.",
    likes: 18,
    creation_date: "2026-07-15T15:47:00.000Z",
  },
  {
    id: 1004,
    from_sapid: "10003456",
    to_sapid: "10002345",
    getterName: "Oliver Brown",
    appreciation_header: "Going above and beyond",
    appreciation_message:
      "Oliver stayed online past midnight to help fix the staging pipeline before our release window. Absolute legend.",
    likes: 27,
    creation_date: "2026-07-15T09:12:00.000Z",
  },
  {
    id: 1005,
    from_sapid: "10007890",
    to_sapid: "10004567",
    getterName: "Ethan Davis",
    appreciation_header: "High quality work",
    appreciation_message:
      "Ethan's quarterly engagement dashboard is the clearest data story I've seen from any team this year. Every exec meeting references it now.",
    likes: 15,
    creation_date: "2026-07-14T20:30:00.000Z",
  },
  {
    id: 1006,
    from_sapid: "10006789",
    to_sapid: "10005678",
    getterName: "Liam Chen",
    appreciation_header: "Mentorship and guidance",
    appreciation_message:
      "Liam spent his own time pairing with two new grads this month, walking them through the codebase with a ton of patience. Real mentor energy.",
    likes: 22,
    creation_date: "2026-07-14T13:18:00.000Z",
  },
  {
    id: 1007,
    from_sapid: "10002345",
    to_sapid: "10009012",
    getterName: "Sofia Martinez",
    appreciation_header: "Great leadership",
    appreciation_message:
      "Sofia handled a really tense client escalation with total calm and turned it into a stronger partnership. Textbook leadership under pressure.",
    likes: 29,
    creation_date: "2026-07-13T17:55:00.000Z",
  },
  {
    id: 1008,
    from_sapid: "10004567",
    to_sapid: "10003456",
    getterName: "Noah Williams",
    appreciation_header: "Timely delivery",
    appreciation_message:
      "Noah caught three critical regressions before they ever reached production this sprint. QA doesn't get enough credit and Noah is a big reason releases go smoothly.",
    likes: 13,
    creation_date: "2026-07-13T10:02:00.000Z",
  },
  {
    id: 1009,
    from_sapid: "10005678",
    to_sapid: "10007890",
    getterName: "Emma Johnson",
    appreciation_header: "Positive attitude",
    appreciation_message:
      "No matter how chaotic the week gets, Emma always brings a level head and a smile into every stand-up. It's contagious.",
    likes: 19,
    creation_date: "2026-07-12T16:20:00.000Z",
  },
  {
    id: 1010,
    from_sapid: "10001234",
    to_sapid: "10002345",
    getterName: "Oliver Brown",
    appreciation_header: "Process improvement",
    appreciation_message:
      "Oliver automated our entire release checklist. What used to take 45 minutes of manual clicking now takes one command. Huge time saver for everyone.",
    likes: 21,
    creation_date: "2026-07-11T14:44:00.000Z",
  },
  {
    id: 1011,
    from_sapid: "10009012",
    to_sapid: "10006789",
    getterName: "Isabella Garcia",
    appreciation_header: "Excellent customer service",
    appreciation_message:
      "Isabella sat in on user interviews for two full days and turned the feedback into a redesign that solved complaints we'd had open for months.",
    likes: 16,
    creation_date: "2026-07-10T11:30:00.000Z",
  },
  {
    id: 1012,
    from_sapid: "10003456",
    to_sapid: "10001234",
    getterName: "Ava Patel",
    appreciation_header: "Good work",
    appreciation_message:
      "Ava's rewrite of the appreciation feed made the whole app feel twice as fast. Small change, massive impact on daily use.",
    likes: 11,
    creation_date: "2026-07-09T09:00:00.000Z",
  },
  {
    id: 1013,
    from_sapid: "10007890",
    to_sapid: "10009012",
    getterName: "Sofia Martinez",
    appreciation_header: "Consistent reliability",
    appreciation_message:
      "Sofia has shipped every single commitment this quarter, on time, without ever cutting corners. That kind of consistency raises the bar for the whole org.",
    likes: 25,
    creation_date: "2026-07-08T19:10:00.000Z",
  },
  {
    id: 1014,
    from_sapid: "10006789",
    to_sapid: "10004567",
    getterName: "Ethan Davis",
    appreciation_header: "Thanks for help buddy",
    appreciation_message:
      "Ethan helped me debug a gnarly SQL query at 6pm on a Friday without being asked twice. Thank you, seriously.",
    likes: 9,
    creation_date: "2026-07-08T08:25:00.000Z",
  },
];

function safeParse(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function loadInitialState() {
  if (typeof window !== "undefined") {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? safeParse(raw) : null;
    if (parsed && parsed.users && parsed.posts && parsed.pendingRequests) {
      return parsed;
    }
  }
  return {
    users: seedUsers,
    posts: seedPosts,
    pendingRequests: seedPendingRequests,
  };
}

let db = loadInitialState();

function persist() {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  }
}

export const mockDB = {
  findBySapId(sapid) {
    return db.users.find((u) => String(u.sapid) === String(sapid)) || null;
  },
  getAllUsers() {
    return [...db.users];
  },
  getUsers() {
    return db.users.filter((u) => u.role === "USER");
  },
  getAdmins() {
    return db.users.filter((u) => u.role === "ADMIN");
  },
  getPendingRequests() {
    return [...db.pendingRequests];
  },
  addPendingRequest(request) {
    const newRequest = {
      id: Date.now(),
      creationDate: new Date().toISOString(),
      ...request,
    };
    db.pendingRequests.push(newRequest);
    persist();
    return newRequest;
  },
  approveRequest(sapid) {
    const idx = db.pendingRequests.findIndex((r) => String(r.sapid) === String(sapid));
    if (idx === -1) return null;
    const request = db.pendingRequests[idx];
    const newUser = {
      id: Date.now(),
      role: "USER",
      total_appreciation: 0,
      rank: db.users.length + 1,
      name: request.name,
      email: request.email,
      phone_number: request.phone_number,
      sapid: request.sapid,
      designation: request.designation,
      project_name: request.project_name,
      password: request.password || "welcome123",
    };
    db.users.push(newUser);
    db.pendingRequests.splice(idx, 1);
    persist();
    return newUser;
  },
  rejectRequest(sapid) {
    db.pendingRequests = db.pendingRequests.filter((r) => String(r.sapid) !== String(sapid));
    persist();
  },
  getPosts() {
    return [...db.posts].sort((a, b) => new Date(b.creation_date) - new Date(a.creation_date));
  },
  addPost(post) {
    const newPost = {
      id: Date.now(),
      likes: 0,
      creation_date: new Date().toISOString(),
      ...post,
    };
    db.posts.unshift(newPost);
    persist();
    return newPost;
  },
  likePost(id) {
    const post = db.posts.find((p) => p.id === id);
    if (post) {
      post.likes += 1;
      persist();
    }
    return post;
  },
  countSentThisMonth(sapid, ref = new Date()) {
    return db.posts.filter((p) => {
      if (String(p.from_sapid) !== String(sapid)) return false;
      const d = new Date(p.creation_date);
      return d.getFullYear() === ref.getFullYear() && d.getMonth() === ref.getMonth();
    }).length;
  },
  reset() {
    db = { users: seedUsers, posts: seedPosts, pendingRequests: seedPendingRequests };
    persist();
  },
};

export const DEMO_CREDENTIALS = {
  user: { sapid: "10001234", password: "pass1234" },
  admin: { sapid: "10009012", password: "pass1234" },
};
