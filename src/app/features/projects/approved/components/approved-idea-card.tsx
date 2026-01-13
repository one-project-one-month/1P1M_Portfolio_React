import { Button } from '@/components/ui/button';
import type { Idea } from '@/types/project';

export default function ApprovedIdeaCard({ project }: { project: Idea }) {
  return (
    <div className="w-full max-w-[386px] h-[298px] bg-[#030712] flex flex-col justify-center items-center gap-4 border border-white/20 text-white text-center rounded-xl p-[28px]">
      <div className="h-full flex flex-col gap-[14px] items-center">
        <div className="w-full h-full">
          <h2 className="text-2xl font-semibold mb-4">{project.name}</h2>
          <p
            className="text-sm text-[#99A1AF] leading-5 overflow-hidden line-clamp-4"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {project.description}
          </p>
        </div>

        <div className="flex justify-center gap-2">
          {project.projectTypes.map((tagName, idx) => (
            <Button
              key={idx}
              type="submit"
              className="h-[28px] text-sm cursor-pointer bg-[#B58400] hover:bg-[#B58400] px-6"
              variant="primary"
              size="secondary"
              onClick={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('=== BUTTON CLICKED - CALLING API ===');
                // await onSubmit(e);
              }}
            >
              <div className="flex items-center justify-center">{tagName}</div>
            </Button>
          ))}
        </div>

        <div className="flex justify-center items-center gap-2">
          <p className="text-[#6A7282]">Submitted by: </p>
          <div className="flex items-center gap-2">
            <img
              src={project.profilePictureUrl}
              className="w-[32px] h-[32px] rounded-full "
              alt="user"
            />
            <p>{project.devName}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
