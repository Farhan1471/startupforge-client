import { getUserSession } from "@/lib/core/session";
import { LayoutSideContentLeft, SquarePlus, PencilToSquare, Envelope, Gear, House, Factory, Person } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export async function DashboardSidebar() {

    const user = await getUserSession();

    const collaboratorNavItems = [
        { icon: House, href: "/dashboard/collaborator", label: "Overview" },
        { icon: Envelope, href: "/dashboard/collaborator/applications", label: "My Application" },
        { icon: Person, href: "/dashboard/collaborator/profile", label: "Profile" }
    ];

    const foundernavItems = [
        { icon: House, href: "/dashboard/founder", label: "Overview" },
        { icon: Factory, href: "/dashboard/founder/startup", label: "My Startup" },
        { icon: SquarePlus, href: "/dashboard/founder/opportunity/add", label: "Add Opportunity" },
        { icon: PencilToSquare, href: "/dashboard/founder/opportunity", label: "Manage Opportunities" },
        { icon: Envelope, href: "/dashboard/founder/applications", label: "Applications" } 
    ];

    const adminnavItems = [
        { icon: House, href: "/dashboard/admin", label: "Overview" },
        { icon: PencilToSquare, href: "/dashboard/admin/manage_users", label: "Manage Users" },
        { icon: PencilToSquare, href: "/dashboard/admin/manage_startups", label: "Manage Startups" },
        { icon: Envelope, href: "/dashboard/admin/transactions", label: "Transactions" } 
    ];

    const navLinksMap = {
        collaborator: collaboratorNavItems,
        founder: foundernavItems,
        admin: adminnavItems
    }

    const navItems = navLinksMap[user?.role || 'collaborator'];

    const navContent = <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
            <Link
                key={item.label}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                href={item.href}
            >
                <item.icon className="size-5 text-muted" />
                {item.label}
            </Link>
        ))}
    </nav>

    return (
        <>
            <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
                {navContent}
            </aside>
            <Drawer>
                <Button className="lg:hidden" variant="secondary">
                    <LayoutSideContentLeft />
                    Sidebar
                </Button>
                <Drawer.Backdrop>
                    <Drawer.Content placement="left">
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger />
                            <Drawer.Header>
                                <Drawer.Heading>Navigation</Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body>
                                {navContent}
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
        </>
    );
}