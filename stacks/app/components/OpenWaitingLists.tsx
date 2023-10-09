import { Form, useNavigation } from "@remix-run/react";

export default function OpenWaitingList() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";
  return (
    <>
      <Form method="post">
        <div>
          <button className="border-2 border-green-500 px-2 rounded">
            {isSubmitting ? "Opening..." : "Open All Lists"}
          </button>
        </div>
      </Form>
    </>
  );
}
