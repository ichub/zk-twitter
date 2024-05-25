export function PostForm() {
  return (
    <div>
      create a new post:
      <div>
        <input type="text" placeholder="title" />
        <br />
        <input type="text" placeholder="image url" />
        <br />
        <textarea placeholder="say something interesting" />
        <br />
        <button>create</button>
      </div>
    </div>
  );
}
