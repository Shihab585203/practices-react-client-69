import { useLoaderData } from "react-router-dom";

const CoursesFullDetails = () => {
  const singleCourseDetails = useLoaderData();
  const { title, img, fee, desc } = singleCourseDetails;
  console.log(singleCourseDetails);
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure>
        <img
          src={img}
          alt="Album"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{desc}</p>
        <div className="card-actions justify-between">
          <p className="font-bold text-2xl text-blue-700">Fee: ${fee}</p>
          <button className="btn btn-primary">Enroll Now</button>
        </div>
      </div>
    </div>
  );
};

export default CoursesFullDetails;
