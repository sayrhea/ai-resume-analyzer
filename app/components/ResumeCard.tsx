import {Link} from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import Navbar from "~/components/Navbar";
import {usePuterStore} from "~/lib/puter";
import {useState, useEffect} from "react";

const ResumeCard = ({resume : {id, jobTitle, companyName, feedback, imagePath}} : {resume : Resume}) => {
    const [resumeUrl, setResumeUrl] = useState("");
    const {fs} = usePuterStore();

    useEffect(() => {
        const loadResume = async () => {
            const blob = await fs.read(imagePath);
            if(!blob) return;
            let url = URL.createObjectURL(blob);
            setResumeUrl(url);
        }
            loadResume();
        }
, [imagePath]);

    return <Link to={`/resume/${id}`} className="resume-card animate-in fade-in duration-1000">
        <div className="resume-card-header">
            <div className="flex flex-col gap-2">
                {companyName && <h2 className='text-black font-bold wrap-break-word'>
                {companyName}
                </h2> }
                {jobTitle && <h3 className="text-gray-500 text-sm wrap-break-word">
                {jobTitle}
                </h3>}
                {!companyName && !jobTitle && <h2 className="text-black! font-bold">Resume</h2>}
            </div>
            <div className="shrink-0">
            <ScoreCircle score={feedback.overallScore}/>
            </div>
        </div>
        {resumeUrl && (
            <div className="gradient-border animate-in fade-in duration-1000">
            <div className="w-full h-full">
                <img src={resumeUrl} alt="Resume" className="w-full h-[350px] max-sm:h-[200px] object-cover object-top" />
            </div>
        </div>
        )}
    </Link>
}

export default ResumeCard;