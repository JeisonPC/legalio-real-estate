'use client';
import { useState } from 'react';



export default function DocumentsPage() {
    const [documents] = useState([]);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Documents</h1>

            <div className="bg-white rounded-lg shadow p-6">
                {documents.length === 0 ? (
                    <p className="text-gray-500">No documents found.</p>
                ) : (
                    <ul className="space-y-4">
                        {documents.map((doc, index) => (
                            <li key={index} className="border-b pb-4">
                                {/* Add document item component here */}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}