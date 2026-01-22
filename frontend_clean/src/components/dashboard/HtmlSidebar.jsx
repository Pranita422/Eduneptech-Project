import HtmlSidebar from "../components/HtmlSidebar";

export default function HTMLPage() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <HtmlSidebar />

      {/* Main content area */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Select a topic to learn</h1>
        {/* You can later show the selected topic content here */}
      </div>
    </div>
  );
}
