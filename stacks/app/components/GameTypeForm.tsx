import {
  Form,
  useNavigation,
  useParams,
  useLoaderData,
} from "@remix-run/react";

export default function GameTypeForm() {
  const params = useParams();
  const gameTypeData = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";
  const defaultValues = gameTypeData
    ? {
        name: gameTypeData.name,
      }
    : {
        name: "",
      };
  return (
    <>
      <div className="flex justify-center text-center">
        <Form
          method={gameTypeData ? "put" : "post"}
          className="grid justify-center items-center text-center space-y-2"
        >
          <label className="">Game Type</label>
          <div className="space-x-2">
            <input
              type="text"
              className="border-2 border-green-700 rounded"
              name="name"
              defaultValue={defaultValues.name}
            />
          </div>

          <div>
            <button disabled={isSubmitting} className="px-1 border-2 rounded">
              {isSubmitting ? "Saving..." : gameTypeData ? "Update" : "Add"}
            </button>
          </div>
        </Form>
      </div>
      {params.id && (
        <div className="flex justify-center text-center pt-10">
          <Form method="delete">
            <div>
              <button className="border-2 border-red-500 px-2 rounded">
                {isSubmitting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </Form>
        </div>
      )}
    </>
  );
}
