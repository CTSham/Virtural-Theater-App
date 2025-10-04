import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function UploadPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  return (
    <div className="panel upload-container">
      <h1>New Film</h1>
      <form action="/api/films/create" method="POST">
        <input className="input" name="title" placeholder="Title" />
        <div className="spacer-8" />
        <textarea
          className="input"
          name="synopsis"
          placeholder="Synopsis"
          rows={3 as any}
        ></textarea>
        <div className="spacer-8" />
        <div className="grid-2col">
          <input
            className="input"
            name="runtimeMins"
            placeholder="Runtime minutes"
          />
          <input
            className="input"
            name="release"
            placeholder="Release label (e.g., June 2025)"
          />
        </div>
        <div className="spacer-8" />
        <div className="grid-2col">
          <input
            className="input"
            name="priceRent"
            placeholder="Rent price (cents)"
          />
          <input
            className="input"
            name="priceBuy"
            placeholder="Buy price (cents)"
          />
        </div>
        <div className="spacer-8" />
        <input
          className="input"
          name="poster"
          placeholder="/posters/indie-film-x.jpg (upload via admin/CDN)"
        />
        <div className="spacer-12" />
        <button className="btn gold" type="submit">
          Create & Request Upload URLs
        </button>
      </form>
      <hr className="sep" />
      <div className="small">
        After submission, you'll receive direct-upload URLs from Mux (one for
        the main feature and optionally one for the trailer). Upload your files
        with curl or a browser uploader; when Mux finishes processing, our
        webhook marks the movie "ready".
      </div>
    </div>
  );
}
