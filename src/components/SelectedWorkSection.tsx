import { selectedWork } from "@/data/selectedWork";

export default function SelectedWorkSection() {
  return (
    <section className="selected-work px-[var(--page-padding)]" aria-label="Selected work">
      <div className="mx-auto w-full min-w-0 max-w-[920px]">
        <div className="selected-work-header">
          <h2 className="section-heading">Selected work</h2>
        </div>
        <ul className="selected-work-grid">
          {selectedWork.map((item) => (
            <li key={item.id} className="selected-work-card">
              <h3 className="selected-work-title">{item.title}</h3>
              <p className="selected-work-category">{item.category}</p>
              <p className="selected-work-deliverable">{item.deliverable}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
