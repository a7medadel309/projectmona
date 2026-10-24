import { redirect } from 'next/navigation';

interface IpostProps {
    // 1. تحديد إن params عبارة عن Promise
    params: Promise<{
        post?: string[];
    }>;
}

// 2. إضافة كلمة async هنا
const Post = async ({ params }: IpostProps) => {
    // 3. فك الـ Promise باستخدام await
    const { post } = await params;

    // 4. لو الصفحة مش موجودة أو المسار فاضي حوله لصفحة البوستات
    if (!post || post.length === 0) {
        redirect('/posts');
    }

    return (
        <div>
            <h1>post page</h1>
            <ul>
                {post.map((p, index) => (
                    <li key={index}>{p}</li>
                ))}
            </ul>
        </div>
    );
};

export default Post;