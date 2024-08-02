import FormSubmission from "@/components/FormSubmission";
import HomeBreadcrumb from "@/components/HomeBreadcrumb";

export default function () {
  return (
    <div className="space-y-3 p-12">
      <HomeBreadcrumb title="Form Actions" />
      <h1 className="text-3xl font-bold">Next.js Form Actions</h1>
      <div>
        <FormSubmission />
      </div>
    </div>
  );
}
